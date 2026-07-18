/* ==========================================================
   AI Wall Crack Detection System
   Final Integrated Script
   
========================================================== */


// ================= GLOBAL VARIABLES =================

let costChart = null;
let capturedBlob = null;
let reportData = {};
let originalImage = null;
let detectedImage = null;
let originalImageBase64 = null;
let detectedImageBase64 = null;

// ================= DOM ELEMENTS =================

const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");

const startCameraBtn = document.getElementById("startCamera");
const captureBtn = document.getElementById("captureBtn");

const analyzeBtn = document.getElementById("analyzeBtn");


// ================= IMAGE UPLOAD PREVIEW =================

if(imageInput){

    imageInput.addEventListener("change", function(){

        const file = this.files[0];


        if(file){


            const reader = new FileReader();


            reader.onload = function(e){


                // Save original image for PDF

                originalImageBase64 = e.target.result;



                // Show preview

                preview.src = e.target.result;

                preview.style.display = "block";


            };


            reader.readAsDataURL(file);



            // Reset camera capture

            capturedBlob = null;


        }


    });


}



// ================= CAMERA START =================

if(startCameraBtn){

    startCameraBtn.addEventListener("click", async()=>{

        try{

            const stream =
            await navigator.mediaDevices.getUserMedia({
                video:true
            });


            video.srcObject = stream;


        }
        catch(error){

            console.log(
                "Camera Error:",
                error
            );

            alert(
                "Camera access denied"
            );

        }


    });

}



// ================= CAPTURE IMAGE =================

if(captureBtn){


    captureBtn.addEventListener("click",()=>{


        if(!video.videoWidth){

            alert(
                "Please start camera first"
            );

            return;

        }



        canvas.width =
        video.videoWidth;


        canvas.height =
        video.videoHeight;



        const ctx =
        canvas.getContext("2d");



        ctx.drawImage(
            video,
            0,
            0,
            canvas.width,
            canvas.height
        );



        preview.src =
        canvas.toDataURL(
            "image/png"
        );


        preview.style.display =
        "block";



        canvas.toBlob((blob)=>{


            capturedBlob = blob;


        },"image/png");



        // remove uploaded image
        imageInput.value = "";


    });


}



// ================= HELPER FUNCTION =================

function getValue(id){

    const element =
    document.getElementById(id);


    if(element){

        return element.value;

    }


    return "";

}



// ================= ANALYZE BUTTON =================

if(analyzeBtn){

    analyzeBtn.addEventListener(
        "click",
        analyzeImage
    );

}
// ==========================================================
// FLASK API CONNECTION + FORM DATA
// ==========================================================


async function analyzeImage(){


    let formData = new FormData();

    // ================= IMAGE DATA =================


    if(capturedBlob){


        formData.append(
            "image",
            capturedBlob,
            "captured_wall.png"
        );


    }

    else{


        const file =
        imageInput.files[0];


        if(!file){


            alert(
                "Upload or capture wall image"
            );


            return;


        }


        formData.append(
            "image",
            file
        );


    }




    // ================= WALL DETAILS =================


    formData.append(
        "wall_length",
        getValue("wallLength")
    );


    formData.append(
        "wall_width",
        getValue("wallWidth")
    );


    formData.append(
        "crack_length",
        getValue("crackLength")
    );


    formData.append(
        "crack_width",
        getValue("crackWidth")
    );


    formData.append(
        "crack_depth",
        getValue("crackDepth")
    );

    // ================= UNIT DETAILS =================


    formData.append(
        "wall_length_unit",
        getValue("wallLengthUnit")
    );


    formData.append(
        "wall_width_unit",
        getValue("wallWidthUnit")
    );


    formData.append(
        "crack_length_unit",
        getValue("crackLengthUnit")
    );


    formData.append(
        "crack_width_unit",
        getValue("crackWidthUnit")
    );


    formData.append(
        "crack_depth_unit",
        getValue("crackDepthUnit")
    );





    // ================= WALL MATERIAL =================


    formData.append(
        "wall_type",
        getValue("wallType")
    );


    formData.append(
        "wall_material",
        getValue("wall_material")
    );



    formData.append(
        "putty",
        getValue("putty")
    );



    formData.append(
        "existing_paint_type",
        getValue("existing_paint_type")
    );



    formData.append(
        "paint_type",
        getValue("paint_type")
    );



    formData.append(
        "coat_type",
        getValue("coat_type")
    );



    formData.append(
        "surface_coating",
        getValue("surface_coating")
    );





    // ================= CUSTOM ESTIMATE =================



    const custom =
    document.getElementById(
        "customEstimate"
    );



    formData.append(
        "custom_estimate",
        custom ? custom.checked : false
    );



    formData.append(
        "cement_price",
        getValue("cementPrice")
    );



    formData.append(
        "putty_price",
        getValue("puttyPrice")
    );



    formData.append(
        "primer_price",
        getValue("primerPrice")
    );



    formData.append(
        "paint_price",
        getValue("paintPrice")
    );



    formData.append(
        "thinner_price",
        getValue("thinnerPrice")
    );





    // ================= BUTTON LOADING =================


    analyzeBtn.disabled = true;


    analyzeBtn.innerHTML =
    "⏳ AI Analyzing...";

    try{


        const response =
        await fetch(
            "http://127.0.0.1:5000/analyze",
            {

                method:"POST",

                body:formData

            }
        );




        if(!response.ok){


            throw new Error(
                "Server Error : "
                +
                response.status
            );


        }




        const data =
        await response.json();



        console.log(
            "Backend Result:",
            data
        );



        reportData = data;



        updateResult(data);
const detectedImage = document.getElementById("detectedImage");

if (detectedImage && data.detected_image) {

    detectedImage.src =
        "http://127.0.0.1:5000" +
        data.detected_image +
        "?t=" +
        new Date().getTime();

    detectedImage.style.display = "block";
}
let img = new Image();

img.crossOrigin = "anonymous";


img.onload = function(){

    let canvas =
    document.createElement("canvas");


    canvas.width = img.width;
    canvas.height = img.height;


    let ctx =
    canvas.getContext("2d");


    ctx.drawImage(
        img,
        0,
        0
    );


    detectedImageBase64 =
    canvas.toDataURL("image/jpeg");

};


img.src =
"http://127.0.0.1:5000" +
data.detected_image;
// Confidence
if(document.getElementById("confidence")){
    document.getElementById("confidence").textContent =
        data.confidence || "-";
}

// Detected Class
if(document.getElementById("detectedClass")){
    document.getElementById("detectedClass").textContent =
        data.crack_type || "-";
}

// Confidence Progress Bar
const fill = document.getElementById("confidenceFill");

if(fill){

    const value =
        parseFloat(data.confidence);

    fill.style.width = value + "%";

}
        loadDashboard();


        loadHistory();



    }


    catch(error){


        console.log(
            error
        );


        alert(
            "Unable to connect Flask Backend ❌"
        );


    }


    finally{


        analyzeBtn.disabled =
        false;


        analyzeBtn.innerHTML =
        "🤖 Analyze with AI";


    }



}
// ==========================================================

// DISPLAY ANALYSIS RESULT + COST UPDATE + CHART
// ==========================================================


// ================= UPDATE RESULT UI =================


function updateResult(data){



    const fields = {

    // AI RESULT

    crackType:
    data.crack_type || "-",

    confidence: data.confidence || "0%",
    
    severity:
    data.severity || "-",

    repair:
    data.repair || "-",

    cost:
    data.total_cost || data.cost || "₹0",

    time:
    data.time || "-",

    // AREA

    wallArea:
    data.wall_area || "-",

    crackArea:
    data.crack_area || "-",

    // QUANTITY

    puttyQty:
    data.putty_qty || "-",

    cementQty:
    data.cement_qty || "-",

    primerQty:
    data.primer_qty || "-",

    paintQty:
    data.paint_qty || "-",

    thinnerQty:
    data.thinner_qty || "-",

    // COST BREAKDOWN

    puttyCost:
    data.putty_cost || "₹0",

    cementCost:
    data.cement_cost || "₹0",

    primerCost:
    data.primer_cost || "₹0",

    paintCost:
    data.paint_cost || "₹0",

    thinnerCost:
    data.thinner_cost || "₹0",

    labourCost: "-",

    totalCost:
    data.total_cost || "₹0"

};
    Object.keys(fields).forEach(id=>{


        const element =
        document.getElementById(id);



        if(element){


            element.textContent =
            fields[id];


        }


    });





    updateMaterialCost(data);


    createCostChart(data);



}




// ================= MATERIAL TOTAL =================

function cleanAmount(value) {

    if (!value) {
        return 0;
    }

    return Number(
        String(value)
            .replace("₹", "")
            .replace(",", "")
            .trim()
    ) || 0;
}


function updateMaterialCost(data) {

    const materialCost =
        cleanAmount(data.putty_cost)
        + cleanAmount(data.cement_cost)
        + cleanAmount(data.primer_cost)
        + cleanAmount(data.paint_cost)
        + cleanAmount(data.thinner_cost);


    const finalCost = materialCost;


    const material =
        document.getElementById("materialCost");

    const labour =
        document.getElementById("labourCostDisplay");

    const final =
        document.getElementById("finalCost");


    if (material) {
        material.textContent =
            "₹" + materialCost.toFixed(2);
    }


    if (labour) {
        labour.textContent = "-";
    }


    if (final) {
        final.textContent =
            "₹" + finalCost.toFixed(2);
    }

}


// ================= COST CHART =================


function createCostChart(data){



    const ctx =
    document.getElementById(
        "costChart"
    );



    if(!ctx){

        return;

    }




    if(costChart){

        costChart.destroy();

    }




    costChart =
    new Chart(ctx,{


        type:"doughnut",




        data:{


            labels:[

                "Putty",

                "Cement",

                "Primer",

                "Paint",

                "Thinner",

                "Labour"

            ],




            datasets:[{


                data:[


                    cleanAmount(
                        data.putty_cost
                    ),



                    cleanAmount(
                        data.cement_cost
                    ),



                    cleanAmount(
                        data.primer_cost
                    ),



                    cleanAmount(
                        data.paint_cost
                    ),



                    cleanAmount(
                        data.thinner_cost
                    ),



                    cleanAmount(
                        data.labour_cost
                    )



                ]



            }]



        },




        options:{


            responsive:true,



            plugins:{


                legend:{


                    position:"bottom"


                },



                title:{


                    display:true,


                    text:
                    "Repair Cost Distribution"


                }



            }


        }



    });



}
// ==========================================================

// DASHBOARD + HISTORY + UNIT CONVERSION + PDF REPORT
// ==========================================================

// ================= DASHBOARD DATA =================


async function loadDashboard(){


    try{


        const response =
        await fetch(
            "http://127.0.0.1:5000/dashboard"
        );



        const data =
        await response.json();





        const elements = {


            totalCount:
            data.total || 0,



            lowCount:
            data.low || 0,



            mediumCount:
            data.medium || 0,



            highCount:
            data.high || 0


        };





        Object.keys(elements)
        .forEach(id=>{


            const el =
            document.getElementById(id);



            if(el){


                el.textContent =
                elements[id];


            }



        });



    }


    catch(error){


        console.log(
            "Dashboard Error:",
            error
        );


    }

}

// ================= HISTORY TABLE =================


async function loadHistory(){


    try{


        const response =
        await fetch(
            "http://127.0.0.1:5000/history"
        );



        const data =
        await response.json();




        const tbody =
        document.querySelector(
            "#historyTable tbody"
        );



        if(!tbody){

            return;

        }




        tbody.innerHTML = "";





        data.forEach(item=>{


            tbody.innerHTML += `


            <tr>


            <td>
            ${item.serial_no}
            </td>



            <td>
            ${item.crack_type || "-"}
            </td>



            <td>
            ${item.suggested_paint_type || "-"}
            </td>



            <td>
            ${item.description || "-"}
            </td>



            <td>
            ${item.paint_quantity || "-"}
            </td>



            <td>
            ${item.severity || "-"}
            </td>



            <td>
            ${item.cost || "-"}
            </td>



            </tr>


            `;



        });



    }


    catch(error){


        console.log(
            "History Error:",
            error
        );


    }

}
// ================= UNIT CONVERSION =================

function setupUnitConversion(inputId, unitId) {

    const input = document.getElementById(inputId);
    const unit = document.getElementById(unitId);

    if (!input || !unit) {
        return;
    }

    let previousUnit = unit.value;

    const toMeter = {
        m: 1,
        cm: 0.01,
        mm: 0.001,
        ft: 0.3048,
        in: 0.0254
    };

    unit.addEventListener("change", function () {

        const newUnit = unit.value;
        const value = parseFloat(input.value);

        if (isNaN(value)) {
            previousUnit = newUnit;
            return;
        }

        // OLD UNIT -> METER
        const valueInMeter =
            value * toMeter[previousUnit];

        // METER -> NEW UNIT
        const convertedValue =
            valueInMeter / toMeter[newUnit];

        input.value =
            parseFloat(convertedValue.toFixed(4));

        previousUnit = newUnit;
    });
}


// ================= APPLY CONVERSION =================

setupUnitConversion(
    "wallLength",
    "wallLengthUnit"
);

setupUnitConversion(
    "wallWidth",
    "wallWidthUnit"
);

setupUnitConversion(
    "crackLength",
    "crackLengthUnit"
);

setupUnitConversion(
    "crackWidth",
    "crackWidthUnit"
);

setupUnitConversion(
    "crackDepth",
    "crackDepthUnit"
);
// ================= CUSTOM ESTIMATE TOGGLE =================


const customEstimate =
document.getElementById(
    "customEstimate"
);



const customOptions =
document.getElementById(
    "customOptions"
);




if(customEstimate){


    customEstimate.addEventListener(
        "change",
        ()=>{


        if(customEstimate.checked){


            customOptions.style.display =
            "block";


        }

        else{


            customOptions.style.display =
            "none";


        }


    });


}






// ================= PDF REPORT =================

document
.getElementById("downloadReportBtn")
?.addEventListener(
    "click",
    downloadPDF
);


function downloadPDF(){
console.log(reportData);
    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF(
        "p",
        "mm",
        "a4"
    );


    // ================= HEADER =================


    pdf.setFillColor(
        25,
        118,
        210
    );


    pdf.rect(
        0,
        0,
        210,
        25,
        "F"
    );


    pdf.setTextColor(
        255,
        255,
        255
    );


    pdf.setFont(
        "helvetica",
        "bold"
    );


    pdf.setFontSize(18);


    pdf.text(
        "AI WALL CRACK DETECTION",
        20,
        12
    );


    pdf.setFontSize(11);


    pdf.text(
        "Inspection & Estimation Report",
        20,
        19
    );



    pdf.setTextColor(
        40,
        40,
        40
    );



    let y = 35;



    // ================= CRACK ANALYSIS =================


    pdf.setFontSize(14);

    pdf.setFont(
        "helvetica",
        "bold"
    );


    pdf.text(
        "CRACK ANALYSIS",
        20,
        y
    );


    y += 10;



    pdf.setFontSize(10);


    pdf.text(
        "Original Wall Image",
        30,
        y
    );


    pdf.text(
        "AI Detection Result",
        125,
        y
    );


    y += 5;



    // Image boxes

    pdf.rect(
        20,
        y,
        75,
        55
    );


    pdf.rect(
        115,
        y,
        75,
        55
    );



    // Original Image

    if(originalImageBase64){

        pdf.addImage(
            originalImageBase64,
            "JPEG",
            20,
            y,
            75,
            55
        );

    }



    // Detection Image

    if(detectedImageBase64){

        pdf.addImage(
            detectedImageBase64,
            "JPEG",
            115,
            y,
            75,
            55
        );

    }



    y += 70;



    // Crack Details


    pdf.setFontSize(11);


    pdf.text(
        "Crack Type",
        25,
        y
    );


    pdf.text(
        ": " + 
        (reportData.crack_type || "-"),
        80,
        y
    );


    y += 8;


    pdf.text(
        "Severity",
        25,
        y
    );


    pdf.text(
        ": " +
        (reportData.severity || "-"),
        80,
        y
    );


    y += 8;


    pdf.text(
        "Confidence",
        25,
        y
    );


    pdf.text(
        ": " +
        (reportData.confidence || "-"),
        80,
        y
    );


    y += 8;


    pdf.text(
        "Risk Level",
        25,
        y
    );


    pdf.text(
        ": Critical",
        80,
        y
    );



    y += 15;



    // ================= WALL DETAILS =================


    pdf.setFont(
        "helvetica",
        "bold"
    );


    pdf.setFontSize(14);


    pdf.text(
        "WALL DETAILS",
        20,
        y
    );


    y += 10;


    pdf.setFontSize(11);
const wallLength = document.getElementById("wallLength")?.value || "-";
const wallWidth = document.getElementById("wallWidth")?.value || "-";
const unit = document.getElementById("measurementUnit")?.value || "";

    const wallDetails = [

    ["Length", `${wallLength} ${unit}`],

    ["Width", `${wallWidth} ${unit}`],

    ["Material", reportData.wall_material || "-"],

    ["Paint Type", reportData.paint_type || "-"]

];

    wallDetails.forEach(row=>{


        pdf.text(
            row[0],
            25,
            y
        );


        pdf.text(
            ": " + row[1],
            80,
            y
        );


        y += 8;

    });



    y += 8;



    // ================= MATERIAL =================



    pdf.setFontSize(14);

    pdf.setFont(
        "helvetica",
        "bold"
    );


    pdf.text(
        "MATERIAL ESTIMATION",
        20,
        y
    );


    y += 8;



    pdf.autoTable({

        startY:y,

        theme:"grid",

        head:[

            [
                "Material",
                "Quantity",
                "Cost"
            ]

        ],


        body:[

            [
                "Putty",
                reportData.putty_qty || "-",
                reportData.putty_cost || "-"
            ],

            [
                "Primer",
                reportData.primer_qty || "-",
                reportData.primer_cost || "-"
            ],

            [
                "Paint",
                reportData.paint_qty || "-",
                reportData.paint_cost || "-"
            ],

            [
                "Cement",
                reportData.cement_qty || "-",
                reportData.cement_cost || "-"
            ]

        ],

        styles:{
            fontSize:10
        }

    });



    y =
    pdf.lastAutoTable.finalY + 12;



    // ================= TOTAL COST =================



    pdf.setFontSize(13);

    pdf.setFont(
        "helvetica",
        "bold"
    );


    pdf.text(

        "TOTAL COST : " +
        (reportData.total_cost || "₹0"),

        25,

        y

    );



    y += 25;



    

pdf.addPage();

y = 20;   // ⭐ மிகவும் முக்கியம்

pdf.setFont("helvetica","bold");
pdf.setFontSize(16);
pdf.setTextColor(0,0,0);

pdf.text("AI Recommendation",20,y);

y += 12;

pdf.setFont("helvetica","normal");
pdf.setFontSize(11);

const recommendations = [
    "Immediate repair recommended",
    "Waterproof coating suggested",
    "Regular inspection advised"
];

recommendations.forEach(text=>{

    pdf.text("• " + text,25,y);

    y += 7;

});


    // ================= FINAL STATUS =================

y += 8;

pdf.setFont("helvetica","bold");
pdf.setFontSize(14);

pdf.text("FINAL STATUS",20,y);

y += 12;

pdf.setTextColor(220,0,0);
pdf.setFontSize(18);

pdf.text("HIGH RISK",105,y,{align:"center"});

y += 10;

pdf.setFontSize(12);

pdf.text("Immediate Action Required",105,y,{align:"center"});

pdf.setTextColor(0,0,0);
    // ================= FOOTER =================


    pdf.setTextColor(
        100,
        100,
        100
    );


    pdf.setFontSize(9);


   const pageHeight = pdf.internal.pageSize.getHeight();

pdf.setTextColor(100,100,100);
pdf.setFontSize(9);

pdf.text(
    "Generated by AI Wall Crack Detection System",
    20,
    pageHeight - 15
);

pdf.text(
    "Powered by YOLOv8 | OpenCV | Flask",
    20,
    pageHeight - 8
);
    pdf.save(
        "AI_Wall_Crack_Report.pdf"
    );


}
// ================= INITIAL LOAD =================


loadDashboard();

loadHistory();


document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        // Button / textarea la Enter normal-a work aaganum
        if (
            document.activeElement.tagName === "BUTTON" ||
            document.activeElement.tagName === "TEXTAREA"
        ) {
            return;
        }


        event.preventDefault();


        const fields = Array.from(
            document.querySelectorAll(
                "input:not([disabled]), select:not([disabled]), textarea:not([disabled])"
            )
        ).filter(
            field => field.offsetParent !== null
        );


        const currentIndex = fields.indexOf(
            document.activeElement
        );


        if (
            currentIndex !== -1 &&
            currentIndex < fields.length - 1
        ) {

            fields[currentIndex + 1].focus();

        }

    }

});
const deleteHistoryBtn = document.getElementById("deleteHistoryBtn");

if (deleteHistoryBtn) {
    deleteHistoryBtn.addEventListener("click", async () => {

        const confirmDelete = confirm(
            "Are you sure you want to delete all analysis history?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(
                "http://127.0.0.1:5000/delete-history",
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {
                alert("Analysis history deleted successfully!");

                location.reload();
            } else {
                alert(data.message || "Failed to delete history.");
            }

        } catch (error) {
            console.error("Delete History Error:", error);
            alert("Unable to connect to server.");
        }
    });
}