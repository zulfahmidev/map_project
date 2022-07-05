let demo = document.querySelector("#demo");
let map = null;
let nodes = [];

// Modes
let modeCreateNode = false;
let modeConnectNode = false;

let poly = [];

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

function myMap() {

    map = new google.maps.Map(demo, {
        center: new google.maps.LatLng(5.176745235, 97.13243756),
        zoom: 15,
        disableDefaultUI: true,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        styles: [{
            featureType: "poi",
            elementType: "labels",
        
            stylers: [{
              visibility: "off"
            }]
        }]
    });

    map.addListener('click', (e) => {
        
        if (modeCreateNode) {
            createNode(e.latLng);
            $('#create_node').removeClass('active');
            modeCreateNode = false;
            Toast.fire({
                icon: 'success',
                title: 'Node Created'
              })
        }
    })
}

function createNode(latLng) {
    let circle = {
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 0.5,
        fillColor: "royalblue",
        strokeOpacity: 1.0,
        strokeColor: "royalblue",
        strokeWeight: 2.0,
        scale: 10.0
    }

    let node = new google.maps.Marker({
        position: latLng,
        icon: circle,
        map,
    });

    node.addListener('click', (e) => {
        if (modeConnectNode) {
            Toast.fire({
                icon: 'success',
                title: 'Node Selected'
            })
        }
    })
    

    nodes.push(node);
}


$('#create_node').click(() => {
    if (modeCreateNode) {
        $('#create_node').removeClass('active');
        modeCreateNode = false;
        Toast.fire({
            icon: 'info',
            title: 'Close success'
          })
    }else {
        $('#create_node').addClass('active');
        modeCreateNode = true;
        Toast.fire({
            icon: 'info',
            title: 'Click any area'
          })
    }
})

$('#connect_node').click(() => {
    if (modeConnectNode) {
        $('#connect_node').removeClass('active');
        modeConnectNode = false;
    }else {
        $('#connect_node').addClass('active');
        modeConnectNode = true;
    }
})

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