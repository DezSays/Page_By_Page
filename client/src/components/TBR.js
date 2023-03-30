import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";

const TBR = () => {
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tbrList, setTbrList] = useState([]);
  const [userID, setUserID] = useState(Number);
  const userIDs = useSelector((state) => state.userID);
  const [test, setTest] = useState([])
  const [test1, setTest1] = useState([])
  const [test2, setTest2] = useState([])
  const [test3, setTest3] = useState([])

  const tbrFetch = async () => {
    setUserID(userIDs);
    const result = await fetch("/api/tbrList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        id: userID,
      },
    });
    await result
      .json()
      .then((data) => {
        setTbrList(data);
        console.log(tbrList)

      })
      .catch((error) => {
        console.log(error);
        return;
      });
      let slicedArr = []
      for(let i=0; i<tbrList.length;i+=3){
        slicedArr = tbrList.slice(i,i+3)
        
      }
      setTest(slicedArr)
      console.log(test) 
  };

  return (
    <div>
      <button onClick={tbrFetch}>click</button>

      {/* <div>{tbrList}</div> */}
      
       <div>
        <h1>{test[0]}</h1> 
        <h2>{test[1]}</h2>
        <h3>{test[2]}</h3>
       </div>
      {/* {tbrList.map((e) => {
        let slicedArr = []
        for(let i=0; i>=tbrList.length;i+=3){
          slicedArr = tbrList.slice(i,i+3)
          setTest(slicedArr)
          console.log(test)
        }
        return (
          <div>
            <div>{e}</div>
          </div>
        ); 
      })} */}
      {/* {tbrList.map(e => {
        return (
        <>
        <h1>{e}</h1>
        <br/>
        <br/>
        <br/>
        <br/>
        </>
        )
      })} */}
    </div>
  );
};
//     }
//   })}
//   </div>
//     //   {Array.from({ length: 4 }).map((_, idx) => (
//     //     <Col>
//     //       <Card>
//     //         <Card.Img variant="top" src="holder.js/100px160" />
//     //         <Card.Body>
//     //           <Card.Title>Card title</Card.Title>
//     //           <Card.Text>
//     //             This is a longer card with supporting text below as a natural
//     //             lead-in to additional content. This content is a little bit
//     //             longer.
//     //           </Card.Text>
//     //         </Card.Body>
//     //       </Card>
//     //     </Col>
//     //   ))}
//     // </Row>

//   );
// }

export default TBR;
