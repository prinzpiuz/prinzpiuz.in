const clappy = document.getElementById("clappy");
const like_button = document.getElementById("like_button");
const clappy_icon_unfilled = document.getElementById("clappy_icon_unfilled");
const clappy_icon_filled = document.getElementById("clappy_icon_filled");
const clappy_icon_explosion = document.getElementById("clappy_icon_explosion");
const clappy_icon_container = document.getElementById("clappy_icon_container");
const ANIMATION_DURATION = 700;

fill_heart = () => {
  clappy_icon_unfilled.style.display = "none";
  clappy_icon_filled.style.display = "block";
};

empty_heart = () => {
  clappy_icon_unfilled.style.display = "block";
  clappy_icon_filled.style.display = "none";
};

show_animation = () => {
  clappy_icon_container.style.display = "none";
  clappy_icon_explosion.style.display = "block";
};

after_animation = () => {
  clappy_icon_explosion.style.display = "none";
  clappy_icon_filled.style.display = "block";
  clappy_icon_container.style.display = "block";
  clappy_icon_unfilled.style.display = "none";
  remove_all_listener();
};

remove_all_listener = () => {
  let new_element = clappy.cloneNode(true);
  clappy.parentNode.replaceChild(new_element, clappy);
};

click_events = () => {
  show_animation();
  setTimeout(after_animation, ANIMATION_DURATION);
};

like_button.addEventListener("mouseover", fill_heart);
like_button.addEventListener("mouseout", empty_heart);
like_button.addEventListener("click", click_events);
