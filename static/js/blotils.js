const blotils = document.getElementById('blotils');
const like_button = document.getElementById('blotils_like_btn');
const blotils_icon_unfilled = document.getElementById('blotils_icon_unfilled');
const blotils_icon_filled = document.getElementById('blotils_icon_filled');
const blotils_icon_explosion = document.getElementById(
    'blotils_icon_explosion',
);
const blotils_icon_container = document.getElementById(
    'blotils_icon_container',
);
const blotils_count = document.getElementById('blotils_count');
const ANIMATION_DURATION = 1000;

const set_likes_count = () => {
    blotils_count.innerText = window.blotils.count + 1;
};

window.addEventListener('DOMContentLoaded', set_likes_count());

const fill_heart = () => {
    blotils_icon_unfilled.style.display = 'none';
    blotils_icon_filled.style.display = 'block';
};

const empty_heart = () => {
    blotils_icon_unfilled.style.display = 'block';
    blotils_icon_filled.style.display = 'none';
};

const show_animation = () => {
    blotils_icon_container.style.display = 'none';
    blotils_icon_explosion.style.display = 'block';
};

const after_animation = () => {
    blotils_icon_explosion.style.display = 'none';
    blotils_icon_filled.style.display = 'block';
    blotils_icon_container.style.display = 'block';
    blotils_icon_unfilled.style.display = 'none';
    remove_all_listener();
};

const remove_all_listener = () => {
    let new_element = blotils.cloneNode(true);
    blotils.parentNode.replaceChild(new_element, blotils);
};

const click_events = () => {
    show_animation();
    setTimeout(after_animation, ANIMATION_DURATION);
    set_likes_count();
};

like_button.addEventListener('mouseover', fill_heart);
like_button.addEventListener('mouseout', empty_heart);
like_button.addEventListener('click', click_events);
