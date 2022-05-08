import "./App.css";
import { Card, Spinner, Navbar, Container, Nav , ListGroup , ListGroupItem } from "react-bootstrap";
import { useEffect, useState } from "react";

function App() {
  const [dataOne, setDataOne] = useState({
    data: [],
    loading: true,
    error: null,
  });

  const [dataAll, setDataAll] = useState({
    data: [],
    loading: true,
    error: null,
  });

  const getDataOne = async () => {
    try {
      const data = await fetch(`http://localhost:3002/api/berita`);
      const json = await data.json();
      setDataOne((prevState) => ({
        ...prevState,
        data: json.data,
        loading: false,
        error: null,
      }));
    } catch (error) {
      setDataOne((prevState) => ({
        ...prevState,
        data: [],
        loading: false,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      }));
      // console.log(error);
      // alert('error')
    }
  };

  const getDataAll = async () => {
    try {
      const data = await fetch(`http://localhost:3002/api/berita-all`);
      const json = await data.json();
      setDataAll((prevState) => ({
        ...prevState,
        data: json.data,
        loading: false,
        error: null,
      }));
    } catch (error) {
      setDataAll((prevState) => ({
        ...prevState,
        data: [],
        loading: false,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      }));
      // console.log(error);
      // alert('error')
    }
  };
  useEffect(() => {
    getDataOne();
    getDataAll();
  }, []);

  console.log(dataAll.data);

  return (
    <div className="Apps">
      {dataOne.loading || dataAll.loading ? (
        <center>
          <Spinner animation="grow" />
        </center>
      ) : (
        <>
          <Navbar bg="primary" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Yudi Gunawan</Navbar.Brand>
              
            </Container>
          </Navbar>
          <center>
            <Card className="col-lg-6 mt-5">
              <Card.Img variant="top" src={dataOne.data.gambarText} />
              <Card.Body>
                <Card.Text>
                  <b> {dataOne.data.titleText}</b>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  Sumber: {dataOne.data.sumberText}
                </small>{" "}
                {", "}
                <small className="text-muted">{dataOne.data.tglText}</small>
              </Card.Footer>
            </Card>
          </center>

          <div>
            <p style={{ fontWeight: "bold", margin: 15, fontSize: 30 }}>Berita Terkait</p>

            {dataAll.data.map((dt, i) => {
              return (
                <div key={i} style={{display:'flex',float:'left' }}>
                <Container>
                  {console.log(dt)}
                <Card  style={{ width: "17rem", margin: 3}}>
                  <Card.Img
                    variant="top"
                    src={dt.gambar}
                  />
                  <Card.Body>
                    <Card.Title>{dt.judul}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>sumber : {dt.sumber}</ListGroupItem>
                    <ListGroupItem>{dt.waktu}</ListGroupItem>
                    <ListGroupItem>{dataOne.data.tglText}</ListGroupItem>
                  </ListGroup>
                </Card>
                </Container>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
