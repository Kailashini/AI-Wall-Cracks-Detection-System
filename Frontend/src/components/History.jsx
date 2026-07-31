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

    </section>
  );
}

export default History;