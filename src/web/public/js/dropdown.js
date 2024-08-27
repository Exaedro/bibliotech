const btn = document.getElementById('dropdown')

tippy(document.querySelectorAll('.menu'), {
    duration: 0,
    arrow: false,
    trigger: 'click',
    placement: 'bottom',
    content: btn.innerHTML
})