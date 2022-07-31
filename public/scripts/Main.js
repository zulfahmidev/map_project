let nodeSelected = null;

// Toast Declarated
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


function main() {

    initIcons();

    map = new GMap("#demo", 5.176745235, 97.13243756);
    map.init();
    
}

$('.sidebarToggle').click(() => {
    if ($('#sidebar').hasClass('show')) {
        $('#sidebar').toggleClass('show')
        setTimeout(() => {
            $('.flyingSidebarToggle').toggleClass('hide')
        }, 300)
    }else {
        $('.flyingSidebarToggle').toggleClass('hide')
        setTimeout(() => {
            $('#sidebar').toggleClass('show')
        }, 300)
    }
})