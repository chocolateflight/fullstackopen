import "./Loading.css"

const Loading = (props) => {
  return (
    <>
      {props.isLoading ? <div className="loading"></div> : props.children}
    </>
  )
}

export default Loading