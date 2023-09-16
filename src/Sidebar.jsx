
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const Sidebar = () => {
  return (
  <div>

<div className="offcanvas offcanvas-start show d-none d-md-block " id="offcanvas" aria-labelledby="offcanvasLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasLabel">Offcanvas</h5>
  </div>
  <div className="offcanvas-body">
  <div className="Sidebar  text-left text-light p-4  vh-100 ">
      <div className="my-3 mx-5">
        <h1 className="covid">Covid-19</h1>
      </div>
      <div className="mt-5 mx-5 ">
        <h3 className="mb-5 ">Part 1</h3>
        <h3 className="mb-5">Part 2</h3>
        <h3 className="mb-5">Part 3</h3>
        <h3 className="mb-5">Part 4</h3>
      </div>
      <div>
        <h3  className="fixed-bottom mx-4 my-3">Settings</h3>
      </div>
    </div>
  </div>
</div>


  </div>
  );
};

export default Sidebar


// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Offcanvas from 'react-bootstrap/Offcanvas';

// function Example() {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Toggle static offcanvas
//       </Button>

//       <Offcanvas show={show} onHide={handleClose} backdrop="static" className='d-none d-md-block' >
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Offcanvas</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//          asdasdasa
//         </Offcanvas.Body>
//       </Offcanvas>
//     </>
//   );
// }

// export default Example;