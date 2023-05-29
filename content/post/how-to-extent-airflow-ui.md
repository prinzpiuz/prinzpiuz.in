---
title: "DYK? You Can Actually Extend Airflow UI 😯"
date: 2023-05-28T10:49:11+05:30
draft: true
categories: ["Python", "Airflow", "Flask"]
---

**This** is a small blog about some recent hurdles I faced in airflow and how I solved it.  
So what is [airflow](https://airflow.apache.org/) as the airflow site says, _"Airflow is a platform created by the community to programmatically author, schedule and monitor workflows."_. In simple worlds it's a platform for programmatically executing workflows which is written in [DAGs](https://en.wikipedia.org/wiki/Directed_acyclic_graph), **Basically Directed Acyclic Graph** which is the full form of DAG, is a concept in [graph theory](https://en.wikipedia.org/wiki/Graph_theory).  

**Coming** to the problem a few weeks back our sign-up [page](https://www.ipvanish.com/) faced some DDoS attack, and we were forced to stop some dependent microservices, one of them is to which was used to pay commission to the affiliates, During that time frame we had more than three thousand sign-ups and paying affiliates commission was got into pending since related microservices where stopped. So my manager told me to write a script and process the log files and fetch the required details and pay the affiliates pending commissions. But I saw some pitfalls in these approaches. One needs to write a script and run it on the server, we need to upload the log files to the server and process them there, This didn't seem to be the best approach. Also, another thing is since each commission payment contains some database fetches and writes and then some API POST method it took about 3-5 seconds to complete. So it will be tough to track the whole process since it will take a decent amount of time to complete. And also I am pretty sure that this can happen in future also. So I need to find a sustainable solution with the following features in mind.

* Easy to do for everyone
* Easy to track the progress
* Reusable

**And** I was thinking, thinking, and thinking again. After an eternity later 😆 I got an idea. We were already using Airflow for orchestrating some of our workflows. And I found second and third points in the above list work better with Airflow than anything else. But for the first point, the best way is an interface to upload the log file and do the necessary validations the process it. But can we do that through airflow? That was the main question. After some quick research, I found that's possible by the design of Airflow. Airflow's UI is capable of extending 💡.  

**Since** Airflow's underlying framework is Flask, and the UI is exposed using Flask-Admin. Airflow provides plugin support such that one can extend functionality by adding additional admin views, blueprints, and templates. Let me show you guys a simple example for explaining how this works. I think it's better to explain this by showing a sample code.  

```python
import csv
from io import StringIO

from airflow import models, settings
from airflow.plugins_manager import AirflowPlugin
from airflow.security import permissions
from airflow.utils import timezone
from airflow.utils.state import State
from airflow.www.app import csrf
from airflow.www.auth import has_access
from flask import Blueprint, redirect, request
from flask_appbuilder import BaseView as AppBuilderBaseView
from flask_appbuilder import expose
from flask_login import login_required

bp = Blueprint(
    "skipped commissions",
    __name__,
    template_folder="templates",
)


class RunSkippedCommissions(AppBuilderBaseView):
    default_view = "uploadInterface"

    def validate_content_type(self, file_obj) -> bool:
        """Validate content type of file uploaded is csv.

        Args:
            file_obj (_type_): Uploaded file object.

        Returns:
            bool: Returns `True` if csv else `False`.

        """
        return file_obj.content_type == "text/csv"

    def validate_csv_format(self, csv_data) -> bool:
        """Validate the uploaded content format is suitable for dag.

        Args:
            csv_data (): Uploaded csv data.

        Returns:
            bool: Returns `True` if csv format is correct else `False`.

        """
        for line, row in enumerate(csv_data):
            return line == 0 and row == ["Date", "Host", "Service", "Message"]

    def trigger_dag_and_redirect(self, csv_data) -> str:
        """Trigger DAG and Redirect to running page.

        Args:
            csv_data (_type_): CSV data that need to parse in DAG.

        Returns:
            str: URL for redirecting.

        """
        dagbag = models.DagBag(settings.DAGS_FOLDER)
        dag_id = "<Dag ID>"
        dag = dagbag.get_dag(dag_id)
        origin = f"/tree?&dag_id={dag_id}"
        execution_date = timezone.utcnow()
        run_id = f"manual__{execution_date.isoformat()}"
        conf = {
            "logData": list(csv_data),
        }
        dag.create_dagrun(
            run_id=run_id,
            execution_date=execution_date,
            state=State.RUNNING,
            conf=conf,
            external_trigger=True,
        )
        return origin

    @csrf.exempt
    @login_required
    @expose("/", methods=["GET", "POST"])
    @has_access(
        [
            (permissions.ACTION_CAN_READ, permissions.RESOURCE_WEBSITE),
        ]
    )
    def uploadInterface(self):
        if request.method == "POST":
            file_obj = request.files["file"]
            if self.validate_content_type(file_obj):
                file = file_obj.read().decode("utf-8")
                csv_data = csv.reader(StringIO(file), delimiter=",")
                if not self.validate_csv_format(csv_data):
                    return self.render_template(
                        "upload.html",
                        message="CSV format is not correct",
                    )
                redirect_url = self.trigger_dag_and_redirect(csv_data)
                return redirect(redirect_url)
            return self.render_template(
                "upload.html",
                message="Only csv files supported",
            )
        return self.render_template("upload.html")


v_appbuilder_view = RunSkippedCommissions()
v_appbuilder_package = {
    "name": "package name",
    "category": "Scripts",
    "view": v_appbuilder_view,
}


class AirflowTestPlugin(AirflowPlugin):
    name = "skipped commissions"
    flask_blueprints = [bp]
    appbuilder_views = [v_appbuilder_package]

```  

**This** will create a Scripts tab in the admin UI menu bar of airflow and a menu item called skipped commission which on clicking will take us to the upload interface page like this.  
[📸 screenshot](https://prinzpiuz.in/images/airflow_ui_extending/airflow_extending.png)  

**So** upon uploading the file, Flask view will do the required validations and if everything is correct this view will trigger the correct dag we want to start with the data from the log file and redirect the page to the corresponding dag page.  

**Meanwhile**, the template file for the above interface is created using [Jinja](https://jinja.palletsprojects.com/en/3.1.x/) and code looks like this.  

```html
{% extends "airflow/main.html" %} {% block content %}
<div style="text-align: center; margin: auto; width: 50%; padding: 10px">
  <h1>Upload Log File</h1>
  <h3>{{message}}</h3>
  <form method="POST" enctype="multipart/form-data">
    <label for="file">Choose file to upload</label></br>
    <input
      type="file"
      accept="text/csv"
      name="file"
      style="display: inline; margin: auto"
    />
    <input type="submit" />
  </form>
</div>
{% endblock %}
```

***

**Further References**

* Read more about Airflow
  * [docs](https://airflow.apache.org/)
  * [source](https://github.com/apache/airflow)
  * [blog](https://medium.com/airbnb-engineering/airflow-a-workflow-management-platform-46318b977fd8)
  * [plugins](https://airflow.apache.org/docs/apache-airflow/stable/authoring-and-scheduling/plugins.html)

* Read more about Flask
  * [docs](https://flask.palletsprojects.com/en/2.3.x/)
  * [source](https://github.com/pallets/flask)
  * [flask admin](https://flask-admin.readthedocs.io/en/latest/)
  * [jinja](https://jinja.palletsprojects.com/en/2.10.x/)
  