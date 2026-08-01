<<<<<<< HEAD
import { useState } from "react";

function History({ history, loadHistory }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteHistory = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all analysis history?"
    );

    if (!confirmDelete) return;

    setIsDeleting(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/delete-history", {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("History deleted successfully");
        if (loadHistory) {
          await loadHistory();
        }
      } else {
        alert(data.message || "Failed to delete history");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to delete history. Check console for details.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section id="history" className="content-card">
      <div className="section-header history-header">
        <div>
          <h2>📋 Analysis History</h2>
        </div>
        <button
          className="delete-history-btn"
          onClick={deleteHistory}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete History"}
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Crack Type</th>
              <th>Suggested Paint Type</th>
              <th>Description</th>
              <th>Paint Quantity</th>
              <th>Severity</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {history && history.length > 0 ? (
              history.map((item, index) => (
                <tr key={index}>
                  <td data-label="Serial No">{index + 1}</td>
                  <td data-label="Crack Type">{item.crack_type}</td>
                  <td data-label="Suggested Paint Type">{item.suggested_paint_type || "-"}</td>
                  <td data-label="Description">{item.description || "-"}</td>
                  <td data-label="Paint Quantity">{item.paint_quantity || "-"}</td>
                  <td data-label="Severity">{item.severity}</td>
                  <td data-label="Cost">{item.cost || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No History Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
=======
import { useEffect, useState } from "react";
import { getHistory } from "../services/api";
const deleteHistory = async () => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete all analysis history?"
  );

  if(!confirmDelete) return;

  try{

    await fetch(
      "http://127.0.0.1:5000/delete-history",
      {
        method:"DELETE"
      }
    );

    alert("History deleted successfully");

    await loadHistory();

  }
  catch(error){

    console.error(error);

  }

};
<button
  className="delete-history-btn"
  onClick={deleteHistory}
>
  Delete History
</button>
function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    loadHistory();
    const deleteHistory = async () => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete all analysis history?"
  );

  if (!confirmDelete) return;

  try {

    const response = await fetch(
      "http://127.0.0.1:5000/delete-history",
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (response.ok && data.success) {

      alert("History deleted successfully");

      setHistory([]);

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.error(error);

  }

};

  }, []);


  const loadHistory = async () => {

    try {

      const data = await getHistory();

      setHistory(data);

    } catch (error) {

      console.error(
        "History Error:",
        error
      );

    }

  };


  return (
    <section id="history" className="content-card">

      <div className="section-header">

        <div>

          <h2>📋 Analysis History</h2>

          <button
  className="delete-history-btn"
  onClick={deleteHistory}
>
  Delete History
</button>

        </div>

      </div>


      <div className="table-container">

        <table>

          <thead>

            <tr>

              <th>Serial No</th>

              <th>Crack Type</th>

              <th>Suggested Paint Type</th>

              <th>Description</th>

              <th>Paint Quantity</th>

              <th>Severity</th>

              <th>Cost</th>

            </tr>

          </thead>


          <tbody>

          {
            history.length > 0 ?

            history.map((item,index)=>(

              <tr key={index}>

                <td>
                  {index + 1}
                </td>


                <td>
                  {item.crack_type}
                </td>


                <td>
  {item.suggested_paint_type || "-"}
</td>

                <td>
                  {item.description || "-"}
                </td>


                <td>{item.paint_quantity || "-"}</td>


                <td>
                  {item.severity}
                </td>


                <td>
  {item.cost || "-"}
</td>


              </tr>

            ))

            :

            <tr>

              <td colSpan="7">
                No History Available
              </td>

            </tr>

          }

          </tbody>

        </table>

      </div>

>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
    </section>
  );
}

<<<<<<< HEAD
export default History;
=======
export default History;
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
