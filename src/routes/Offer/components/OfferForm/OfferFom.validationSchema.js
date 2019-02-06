import {
  CLASSES,
  ITEM_TYPES,
  POST_TYPES,
  CLOTHES,
  CREATURE_MAX_LEVEL,
  ITEM_MAX_LEVEL
} from 'constants/entities'
import * as Yup from 'yup'

export default Yup.object({
  title: Yup.string()
    .required('Titulo es requerido.')
    .min(6, 'Mínimo 6 caracteres.')
    .max(50, 'Máximo 50 caracteres.'),
  description: Yup.string()
    .required('Descripción es requerida.')
    .min(20, 'Mínimo 20 caracteres.')
    .max(500, 'Máximo 500 caracteres.'),
  offerType: Yup.string()
    .required('Tipo de oferta es requerido.')
    .oneOf(Object.keys(POST_TYPES)),
  itemType: Yup.mixed()
    .default('nothing')
    .when('offerType', {
      is: 'ONLY',
      then: Yup.string().oneOf(
        Object.keys(ITEM_TYPES),
        'Seleccione uno de los tipos disponibles'
      ),
      otherwise: Yup.mixed().notRequired()
    }),
  itemClass: Yup.mixed()
    .default('nothing')
    .when('itemType', {
      is: value => CLOTHES.hasOwnProperty(value),
      then: Yup.string().oneOf(
        Object.keys(CLASSES),
        'Seleccione una de las clases disponibles'
      ),
      otherwise: Yup.mixed().notRequired()
    }),
  itemLevel: Yup.mixed()
    .default('nothing')
    .notRequired()
    .when('itemType', {
      is: 'CREATURE',
      then: Yup.number()
        .min(0, 'Level de item debe ser mínimo +0')
        .max(CREATURE_MAX_LEVEL, 'Level de item debe ser máximo +99'),
      otherwise: Yup.number()
        .min(0, 'Level de item debe ser mínimo +0')
        .max(ITEM_MAX_LEVEL, 'Level de item debe ser máximo +10')
    })
})
