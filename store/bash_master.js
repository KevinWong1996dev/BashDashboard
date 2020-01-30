import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
Vue.use(Vuex)

export const state = () => {
    return {
        api_url: 'https://bash-parties.appspot.com/api/v1/',
        sessionFlag: false,
        master: {},
        anfitrion: {},
        info_anfitrion: {},
        anfitriones: [],
        anfitriones_validados: [],
        api_key: '',
        access_token: '',
        refresh_token: ''
            // masters: [],
            // locales: [],
            // anfitriones: [],
            // categorias: [],
            // categoria: [],
            // subcategorias: [],
            // usuarios: []
    }
}

export const mutations = {
    iniciar_sesion(state) {
        state.sessionFlag = true
    },

    cerrar_sesion(state) {
        state.sessionFlag = false
        state.master = {}
        state.api_key = ''
        state.access_token = ''
    },

    guardar_token(state, payload) {
        state.api_key = payload
    },

    guardar_access_token(state, payload) {
        state.access_token = payload
    },

    guardar_refresh_token(state, payload) {
        state.refresh_token = payload
    },
    guardar_master(state, payload) {
        state.master = payload
    },

    guardar_anfitrion(state, payload) {
        state.anfitrion = payload
    },

    guardar_anfitriones(state, payload) {
        state.anfitriones = payload
    },

    guardar_anfitriones_validados(state, payload) {
        state.anfitriones_validados = payload
    }

    // guardar_locales(state, payload) {
    //     state.locales = payload
    // },
    // guardar_administradores(state, payload) {
    //     state.administradores = payload
    // },
    // guardar_categorias(state, payload) {
    //     state.categorias = payload
    // },

    // guardar_categoria(state, payload) {
    //     state.categoria = payload
    // },

    // guardar_subcategorias(state, payload) {
    //     state.subcategorias = payload
    // },

    // guardar_usuarios(state, payload) {
    //     state.usuarios = payload
    // }
}

export const actions = {
    // peticion_psw(context, payload) {
    //     return new Promise((resolve, reject) => {
    //         let formData = new FormData()
    //         formData.append('correo', payload.correo)
    //         axios({
    //             method: 'POST',
    //             url: context.state.api_url + 'recover/request',
    //             headers: { 'Content-Type': 'multipart/form-data' },
    //             data: formData
    //         }).then(
    //             result => {
    //                 resolve(result)
    //             },
    //             error => {
    //                 console.log(error + ' ErrorAlEnviarCorreo')
    //                 reject(error.response.data)
    //             }
    //         )
    //     })
    // },

    // cambio_psw(context, payload) {
    //     return new Promise((resolve, reject) => {
    //         let formData = new FormData()
    //         formData.append('correo', payload.correo)
    //         formData.append('code', payload.code)
    //         formData.append('clave', payload.clave)
    //         axios({
    //             method: 'POST',
    //             url: context.state.api_url + 'recover/password',
    //             headers: { 'Content-Type': 'multipart/form-data' },
    //             data: formData
    //         }).then(
    //             result => {
    //                 resolve(result.data)
    //             },
    //             error => {
    //                 console.log(error + ' ErrorAlEnviarCorreo')
    //                 reject(error.response.data)
    //             }
    //         )
    //     })
    // },

    login_master(context, payload) {
        return new Promise((resolve, reject) => {
            let formData = new FormData()
            formData.append('correo', payload.correo)
            formData.append('clave', payload.clave)

            axios({
                method: 'POST',
                url: context.state.api_url + 'administradores/login',
                headers: { 'Content-Type': 'multipart/form-data' },
                data: formData
            }).then(
                result => {
                    context.commit('iniciar_sesion')
                    context.commit('guardar_access_token', result.data.data.access_token)
                    context.commit('guardar_master', result.data.data.correo)
                    resolve(result)
                },
                error => {
                    console.log(error + ' ErrorAlIngresar')
                    reject(error.response.data)
                }
            )
        })
    },

    async get_informacion(context) {
        console.log(context.state.access_token)
        await axios({
            method: 'GET',
            url: context.state.api_url + 'usuarios/me',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + context.state.access_token
            }
        }).then(
            result => {
                context.commit('info_anfitrion', result.data.data)
                console.log(result.data.data)
            },
            error => {
                console.log(error + ' ErrorConseguirinfo')
            }
        )
    },

    // async get_masters(context) {
    //     await axios({
    //         method: 'GET',
    //         url: context.state.api_url + 'masters',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             token: context.state.api_key
    //         }
    //     }).then(
    //         result => {
    //             context.commit('guardar_masters', result.data.masters)
    //         },
    //         error => {
    //             console.log(error + ' ErrorConseguirMasters')
    //         }
    //     )
    // },
    async get_anfitriones(context) {
        await axios({
            method: 'GET',
            url: context.state.api_url + 'usuarios/anfitriones/no_operativos',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + context.state.access_token
            }
        }).then(
            result => {
                context.commit('guardar_anfitriones', result.data.data.anfitriones)
            },
            error => {
                console.log(error + ' ErrorConseguirEventos')
            }
        )
    },

    async get_anfitriones_validados(context) {
        await axios({
            method: 'GET',
            url: context.state.api_url + 'usuarios/anfitriones/operativos',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + context.state.access_token
            }
        }).then(
            result => {
                context.commit(
                    'guardar_anfitriones_validados',
                    result.data.data.anfitriones
                )
            },
            error => {
                console.log(error + ' ErrorConseguirEventos')
            }
        )
    },

    aprobarmaster(context, payload) {
        return new Promise((resolve, reject) => {
            let formData = new FormData()

            axios({
                method: 'POST',
                url: context.state.api_url +
                    'usuarios/' +
                    payload.id +
                    '/anfitrion/validar',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + context.state.access_token
                }
            }).then(
                result => {
                    resolve(result)
                },

                error => {
                    console.log(error + ' ErrorAprobandoAnfitrion')
                    reject(error.response.data)
                }
            )
        })
    },
    rechazarmaster(context, payload) {
        return new Promise((resolve, reject) => {
            let formData = new FormData()

            axios({
                method: 'DELETE',
                url: context.state.api_url +
                    'usuarios/' +
                    payload.id +
                    '/anfitrion/invalidar',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + context.state.access_token
                }
            }).then(
                result => {
                    resolve(result)
                },

                error => {
                    console.log(error + ' ErrorRechazandoAnfitrion')
                    reject(error.response.data)
                }
            )
        })
    }

    // editar_master(context, payload) {
    //     return new Promise((resolve, reject) => {
    //         let formData = `nombres=${payload.nombres}&correo=${payload.correo}&clave=${payload.clave}`
    //         axios({
    //             method: 'PUT',
    //             url: context.state.api_url + 'masters/' + payload.id_master,
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //                 token: context.state.api_key
    //             },
    //             data: formData
    //         }).then(
    //             result => {
    //                 resolve(result)
    //             },
    //             error => {
    //                 console.log(error + ' ErrorEditarUsuario')
    //                 reject(error.response.data)
    //             }
    //         )
    //     })
    // },

    // async get_locales(context) {
    //     await axios({
    //         method: 'GET',
    //         url: context.state.api_url + 'locales',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             token: context.state.api_key
    //         }
    //     }).then(
    //         result => {
    //             context.commit('guardar_locales', result.data.locales)
    //         },
    //         error => {
    //             console.log(error + ' ErrorConseguirLocales')
    //         }
    //     )
    // },

    // crear_local(context, payload) {
    //     return new Promise((resolve, reject) => {
    //         let formData = new FormData()
    //         formData.append('nombres', payload.nombres)
    //         formData.append('direccion', payload.direccion)
    //         formData.append('telefono', payload.telefono)

    //         axios({
    //             method: 'POST',
    //             url: context.state.api_url + 'locales',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 token: context.state.api_key
    //             },
    //             data: formData
    //         }).then(
    //             result => {
    //                 resolve(result)
    //             },
    //             error => {
    //                 console.log(error + ' ErrorRegistrarLocal')
    //                 reject(error.response.data)
    //             }
    //         )
    //     })
    // },

    // editar_local(context, payload) {
    //     return new Promise((resolve, reject) => {
    //         let formData = `nombres=${payload.nombres}&direccion=${payload.direccion}&telefono=${payload.telefono}`
    //         axios({
    //             method: 'PUT',
    //             url: context.state.api_url + 'locales/' + payload.id_local,
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //                 token: context.state.api_key
    //             },
    //             data: formData
    //         }).then(
    //             result => {
    //                 resolve(result)
    //             },
    //             error => {
    //                 console.log(error + ' ErrorEditarUsuario')
    //                 reject(error.response.data)
    //             }
    //         )
    //     })
    // },

    // eliminarlocal(context, payload) {
    //     return new Promise((resolve, reject) => {
    //         axios({
    //             method: 'DELETE',
    //             url: context.state.api_url + 'locales/' + payload.id_local,

    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 token: context.state.api_key
    //             }
    //         }).then(
    //             result => {
    //                 resolve(result)
    //             },

    //             error => {
    //                 console.log(error + ' ErrorBorrandoLocal')
    //                 reject(error.response.data)
    //             }
    //         )
    //     })
    // },

    // async get_administradores(context) {
    //     await axios({
    //         method: 'GET',
    //         url: context.state.api_url + 'administradores',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             token: context.state.api_key
    //         }
    //     }).then(
    //         result => {
    //             context.commit('guardar_administradores', result.data.administradores)
    //         },
    //         error => {
    //             console.log(error + ' ErrorConseguirAdministradores')
    //         }
    //     )
    // },
    // crear_administrador(context, payload) {
    //     return new Promise((resolve, reject) => {
    //         let formData = new FormData()
    //         formData.append('nombres', payload.nombres)
    //         formData.append('correo', payload.correo)
    //         formData.append('clave', payload.clave)
    //         formData.append('id_local', payload.id_local)

    //         axios({
    //             method: 'POST',
    //             url: context.state.api_url + 'administradores',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 token: context.state.api_key
    //             },
    //             data: formData
    //         }).then(
    //             result => {
    //                 resolve(result)
    //             },
    //             error => {
    //                 console.log(error + ' ErrorRegistrarAdministrador')
    //                 reject(error.response.data)
    //             }
    //         )
    //     })
    // },

    // editar_administrador(context, payload) {
    //     return new Promise((resolve, reject) => {
    //         let data = qs.stringify({
    //             nombres: payload.nombres,
    //             correo: payload.correo,
    //             clave: payload.clave,
    //             id_local: payload.id_local
    //         })
    //         axios({
    //             method: 'PUT',
    //             url: context.state.api_url + 'administradores/' + payload.id_administrador,
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //                 token: context.state.api_key
    //             },
    //             data: data
    //         }).then(
    //             result => {
    //                 resolve(result)
    //             },
    //             error => {
    //                 console.log(error + ' ErrorEditarAdministrador')
    //                 reject(error.response.data)
    //             }
    //         )
    //     })
    // },

    // eliminaradministrador(context, payload) {
    //     return new Promise((resolve, reject) => {
    //         axios({
    //             method: 'DELETE',
    //             url: context.state.api_url + 'administradores/' + payload.id_administrador,

    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 token: context.state.api_key
    //             }
    //         }).then(
    //             result => {
    //                 resolve(result)
    //             },

    //             error => {
    //                 console.log(error + ' ErrorBorrandoUsuario')
    //                 reject(error.response.data)
    //             }
    //         )
    //     })
    // },

    // async get_categorias(context) {
    //     await axios({
    //         method: 'GET',
    //         url: context.state.api_url + 'categorias',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             token: context.state.api_key
    //         }
    //     }).then(
    //         result => {
    //             context.commit('guardar_categorias', result.data.categorias)
    //         },
    //         error => {
    //             console.log(error + ' ErrorConseguirCategorias')
    //         }
    //     )
    // },

    // crear_categorias(context, payload) {
    //     return new Promise((resolve, reject) => {
    //         let formData = new FormData()
    //         formData.append('nombres', payload.nombres)
    //         formData.append('codigo', payload.codigo)
    //         formData.append('descripcion', payload.descripcion)
    //         formData.append('imagen', payload.imagen)

    //         axios({
    //             method: 'POST',
    //             url: context.state.api_url + 'categorias',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 token: context.state.api_key
    //             },
    //             data: formData
    //         }).then(
    //             result => {
    //                 resolve(result)
    //             },
    //             error => {
    //                 console.log(error + ' ErrorRegistrarCategorias')
    //                 reject(error.response.data)
    //             }
    //         )
    //     })
    // },

    // editar_categoria(context, payload) {
    //     return new Promise((resolve, reject) => {
    //         // let formData = `nombres=${payload.nombres}&codigo=${payload.codigo}&descripcion=${payload.descripcion}&imagen=${payload.imagen}`
    //         let data = qs.stringify({
    //             nombres: payload.nombres,
    //             codigo: payload.codigo,
    //             descripcion: payload.descripcion,
    //             imagen: payload.imagen
    //         })
    //         axios({
    //             method: 'PUT',
    //             url: context.state.api_url + 'categorias/' + payload.id_categoria,
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //                 token: context.state.api_key
    //             },
    //             data: data
    //         }).then(
    //             result => {
    //                 resolve(result)
    //             },
    //             error => {
    //                 console.log(error + ' ErrorEditarUsuario')
    //                 reject(error.response.data)
    //             }
    //         )
    //     })
    // },

    // eliminarcategoria(context, payload) {
    //     return new Promise((resolve, reject) => {
    //         axios({
    //             method: 'DELETE',
    //             url: context.state.api_url + 'categorias/' + payload.id_categoria,

    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 token: context.state.api_key
    //             }
    //         }).then(
    //             result => {
    //                 resolve(result)
    //             },

    //             error => {
    //                 console.log(error + ' ErrorBorrandoCategoria')
    //                 reject(error.response.data)
    //             }
    //         )
    //     })
    // },

    // async get_subcategorias(context, payload) {
    //     context.commit('guardar_subcategorias', payload.subcategorias)
    //     context.commit('guardar_categoria', payload)
    // },

    // async get_subcategorias_por_categoria(context, payload) {
    //     context.state.categorias.forEach(categoria => {
    //         if (categoria.id_categoria == context.state.categoria.id_categoria) {
    //             context.commit('guardar_subcategorias', categoria.subcategorias)
    //         }
    //     })
    // },

    // crear_subcategorias(context, payload) {
    //     return new Promise((resolve, reject) => {
    //         let formData = new FormData()
    //         formData.append('id_categoria', context.state.categoria.id_categoria)
    //         formData.append('nombres', payload.nombres)
    //         formData.append('codigo', payload.codigo)
    //         formData.append('descripcion', payload.descripcion)
    //         formData.append('imagen', payload.imagen)

    //         axios({
    //             method: 'POST',
    //             url: context.state.api_url + 'subcategorias',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 token: context.state.api_key
    //             },
    //             data: formData
    //         }).then(
    //             result => {
    //                 resolve(result)
    //             },
    //             error => {
    //                 console.log(error + ' ErrorRegistrarsubCategorias')
    //                 reject(error.response.data)
    //             }
    //         )
    //     })
    // },

    // editar_subcategoria(context, payload) {
    //     return new Promise((resolve, reject) => {
    //         // let formData = `nombres=${payload.nombres}&codigo=${payload.codigo}&descripcion=${payload.descripcion}&imagen=${payload.imagen}`
    //         let data = qs.stringify({
    //             id_categoria: context.state.categoria.id_categoria,
    //             nombres: payload.nombres,
    //             codigo: payload.codigo,
    //             descripcion: payload.descripcion,
    //             imagen: payload.imagen
    //         })
    //         axios({
    //             method: 'PUT',
    //             url: context.state.api_url + 'subcategorias/' + payload.id_subcategoria,
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //                 token: context.state.api_key
    //             },
    //             data: data
    //         }).then(
    //             result => {
    //                 resolve(result)
    //             },
    //             error => {
    //                 console.log(error + ' ErrorEditarSubcategoria')
    //                 reject(error.response.data)
    //             }
    //         )
    //     })
    // },

    // eliminarsubcategoria(context, payload) {
    //     return new Promise((resolve, reject) => {
    //         axios({
    //             method: 'DELETE',
    //             url: context.state.api_url + 'subcategorias/' + payload.id_subcategoria,

    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 token: context.state.api_key
    //             }
    //         }).then(
    //             result => {
    //                 resolve(result)
    //             },

    //             error => {
    //                 console.log(error + ' ErrorBorrandoSubCategoria')
    //                 reject(error.response.data)
    //             }
    //         )
    //     })
    // }
}