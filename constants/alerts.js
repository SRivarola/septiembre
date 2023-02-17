import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const alertError = (message) => {
  MySwal.fire({
    title: <p>{message}</p>,
    color: '#000',
    icon: 'error',
    iconColor: '#ff0000',
    background: '#fff',
    showConfirmButton: false,
    toast: true,
    timer: '2500',
    timerProgressBar: true,
    position: 'bottom-end',
  })
}

const alertSuccess = (message) => {
  MySwal.fire({
    title: <p>{message}</p>,
    color: '#000',
    icon: 'success',
    iconColor: '#17962a',
    background: '#fff',
    showConfirmButton: false,
    toast: true,
    timer: '2000',
    timerProgressBar: true,
    position: 'bottom-end',
  })
}

export {
  alertError,
  alertSuccess
}