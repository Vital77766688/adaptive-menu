function is_touch_device4() {
    
    const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    
    const mq = function (query) {
        return window.matchMedia(query).matches;
    }

    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        return true;
    }

    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH
    const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
}


const nav_burger = document.querySelector('.nav-burger')
const nav_menu = document.querySelector('.nav-menu')

nav_burger.addEventListener('click', () => {
	nav_burger.classList.toggle('active')
	nav_menu.classList.toggle('active')
})


const nav_menu_items = document.querySelectorAll('.nav-menu-list-item')


if (is_touch_device4()) {

	document.querySelector('body').classList.add('touch')

	nav_menu_items.forEach(nav_menu_item => {
		const submenu_list = nav_menu_item.querySelector('.nav-submenu-list')
		if (submenu_list) {
			const arrow = document.createElement('span')
			arrow.classList.add('arrow')
			nav_menu_item.append(arrow)
			nav_menu_item.classList.add('extended')
			arrow.addEventListener('click', () => {
				submenu_list.classList.toggle('active')
				arrow.classList.toggle('active')
			})
		}
	})


	window.addEventListener('click', e => {
		nav_menu_items.forEach(nav_menu_item => {
			const submenu_list = nav_menu_item.querySelector('.nav-submenu-list')
			if (submenu_list) {
				const arrow = nav_menu_item.querySelector('.arrow')
				if (e.target != submenu_list && e.target != arrow) {
					submenu_list.classList.remove('active')
					arrow.classList.remove('active')
				}
			}
		})
	})
} else {
	document.querySelector('body').classList.add('mouse')
}