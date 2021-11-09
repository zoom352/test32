import Modal from "./modal";


const ModalContainer = ({
    photo,
    active,
    setActive
}) => {

    return <div>
        {photo.map(phot =>
        <Modal
          active={active}
          setActive={setActive}
          id={phot.id}
          url={phot.url} />)}
    </div>
}

export default ModalContainer;