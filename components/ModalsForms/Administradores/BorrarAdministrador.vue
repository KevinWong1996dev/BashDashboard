<template> </template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['isComponentModalActive'],
  data() {
    return {}
  },
  methods: {
    ...mapActions({
      get_administradores: 'nelsongo/get_administradores',
      eliminaradministrador: 'nelsongo/eliminaradministrador'
    }),
    async eliminar() {
      await this.eliminaradministrador(this.usuario)
        .then(result => {
          this.get_administradores()
          this.$swal({
            type: 'success',
            title: 'Correcto',
            text: result.data.message,
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancelar'
          }).then(() => {
            this.$emit('cerrarmodal')
          })
        })
        .catch(error => {
          this.$swal({
            type: 'error',
            title: 'Intente de nuevo',
            text: error.message,
            confirmButtonText: 'Ok'
          })
        })
    }
  }
}
</script>
