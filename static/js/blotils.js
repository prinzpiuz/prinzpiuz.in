const blotils = document.getElementById('blotils');
const like_button = document.getElementById('blotils_like_button');
const blotils_icon_unfilled = document.getElementById('blotils_icon_unfilled');
const blotils_icon_filled = document.getElementById('blotils_icon_filled');
const blotils_icon_explosion = document.getElementById(
    'blotils_icon_explosion',
);
const blotils_icon_container = document.getElementById(
    'blotils_icon_container',
);
const blotils_count = document.getElementById('blotils_count_main');
const ANIMATION_DURATION = 700;

window.addEventListener('DOMContentLoaded', async () => {
    setTimeout(async () => {
        await set_likes_count();
    }, 5000);
});

set_likes_count = async () => {
    let blotils_data = await window.blotils.get_likes();
    blotils_count.innerText = blotils_data.count;
};

fill_heart = () => {
    blotils_icon_unfilled.style.display = 'none';
    blotils_icon_filled.style.display = 'block';
};

empty_heart = () => {
    blotils_icon_unfilled.style.display = 'block';
    blotils_icon_filled.style.display = 'none';
};

show_animation = () => {
    blotils_icon_container.style.display = 'none';
    blotils_icon_explosion.style.display = 'block';
};

after_animation = () => {
    blotils_icon_explosion.style.display = 'none';
    blotils_icon_filled.style.display = 'block';
    blotils_icon_container.style.display = 'block';
    blotils_icon_unfilled.style.display = 'none';
    remove_all_listener();
};

remove_all_listener = () => {
    let new_element = blotils.cloneNode(true);
    blotils.parentNode.replaceChild(new_element, blotils);
};

click_events = async () => {
    show_animation();
    setTimeout(after_animation, ANIMATION_DURATION);
    await set_likes_count();
};

like_button.addEventListener('mouseover', fill_heart);
like_button.addEventListener('mouseout', empty_heart);
like_button.addEventListener('click', click_events);
