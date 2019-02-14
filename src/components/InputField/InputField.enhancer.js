import shouldUpdate from 'recompose/shouldUpdate'

export default shouldUpdate(
  (props, nextProps) =>
    props.errors[props.name] !== nextProps.errors[props.name] ||
    props.values[props.name] !== nextProps.values[props.name] ||
    props.touched[props.name] !== nextProps.touched[props.name]
)
