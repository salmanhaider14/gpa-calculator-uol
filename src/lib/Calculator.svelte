<script lang="ts">
  let totalCreditHours = 0;
  let totalGradePoints = 0;
  let gpa = 0;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Reset values before recalculating
    totalCreditHours = 0;
    totalGradePoints = 0;

    const subjectContainer = document.getElementById("subject-container");
    const subjectDivs = subjectContainer?.querySelectorAll(".grid.grid-cols-7.gap-2.items-center");

    if (subjectDivs) {
      subjectDivs.forEach((subjectDiv: any) => {
        const creditHoursInput = subjectDiv.querySelector('input[placeholder="Cr"]');
        const marksInput = subjectDiv.querySelector('input[placeholder="Marks"]');

        if (creditHoursInput && marksInput) {
          const creditHours = parseFloat(creditHoursInput.value);
          const marks = parseFloat(marksInput.value);
          let subjectGrade
          switch (true) {
            case marks >= 85:
              subjectGrade = 4;
              break;
              case marks >= 80:
                subjectGrade = 3.75;
                break;
                case marks >= 75:
                  subjectGrade = 3.50;
                  break
                  case marks >= 70:
                  subjectGrade = 3
                  break
                  case marks >= 65:
                  subjectGrade = 2.50;
                  break;
                  case marks >= 60:
                    subjectGrade = 2
                    break;
                    case marks >= 55:
                    subjectGrade = 1.50
                    break;
                    case marks >= 50:
                      subjectGrade = 1
                      break
                      default :
                      subjectGrade = 0;
                      break;
          
           
          }

          if (!isNaN(creditHours) && !isNaN(marks)) {
            // Calculate grade points (customize this based on your grading system)
            const gradePoints = subjectGrade  * creditHours;

            totalCreditHours += creditHours;
            totalGradePoints += gradePoints;
          }
        }
      });
    }

    // Calculate GPA
    gpa = totalCreditHours > 0 ? totalGradePoints / totalCreditHours : 0;
    
  };

  const handleAdd = () => {
    const subjectContainer = document.getElementById("subject-container");

    const newSubjectDiv: any = document.createElement("div");
    newSubjectDiv.className = "grid grid-cols-7 subject-div gap-2 items-center justify-center";
    

    const inputNames = ["Name", "Cr", "Marks"];
    inputNames.forEach((inputName) => {
      const inputDiv = document.createElement("div");
    
      inputDiv.className = inputName === "Name" ? "flex flex-col gap-1 col-span-3" : inputName === "Cr" ? "flex flex-col gap-1 col-span-1" : "flex flex-col gap-1 col-span-2";

      // const label = document.createElement("p");
      // label.textContent = inputName + ":";
      // inputDiv.appendChild(label);

      const input = document.createElement("input");
      
      input.type = inputName === "Name" ? "text" : "number";
      input.required = inputName === "Name" ? false : true;
      
      input.placeholder = `${inputName}`;
      input.className= "p-2 border-2 border-gray rounded focus:outline-2 focus:outline-blue-500 shadow-md "
      inputDiv.appendChild(input);

      newSubjectDiv.appendChild(inputDiv);
    });

    const removeButton = document.createElement("button");
    removeButton.className = "w-[30px] h-[30px] rounded-full text-lg bg-green-800 text-white";
    removeButton.textContent = "-";
    removeButton.addEventListener("click", () => handleRemove(newSubjectDiv));
    newSubjectDiv.appendChild(removeButton);

    subjectContainer?.appendChild(newSubjectDiv);
    
  };

  const handleRemove = (divToRemove: HTMLDivElement) => {
    const subjectContainer = document.getElementById("subject-container");
    subjectContainer?.removeChild(divToRemove);
   
  };
</script>


<div class="flex justify-center items-center flex-col"><div class="flex gap-1 my-3 mx-5 md:mx-10 lg:mx-15 xl:mx-20 2xl:mx-24">
  <button class="w-[30px] h-[30px] rounded-full bg-green-800 text-white" on:click={handleAdd}>+</button>
  <h3 class="text-xl font-bold ml-3">Add Course:</h3>
</div>

<hr class="my-2"/>

<form on:submit={handleSubmit} class="w-full md:w-[50%] p-1 ">

  {#if totalCreditHours > 0}
<div class="my-2 bg-green-700 text-white font-semibold flex justify-around items-center gap-3 text-lg p-2 rounded-md shadow-md"> <p class="ml-3">GPA: {gpa.toFixed(2)}</p><p class="ml-3">Total Credit Hours: {totalCreditHours}</p>
 </div>
  
{/if}
  <div id="subject-container" class="flex flex-col gap-2 ">
    <div class="grid grid-cols-7 items-center gap-2 font-semibold ">
      
 <h1 class="col-span-3" >Course</h1>
      
   
    <h1 class="col-span-1">Cr</h1>
    <h1 class="col-span-2">Marks</h1>
  </div>
  </div>
  
  <button type="submit" class="bg-green-800 w-full uppercase font-bold text-white p-3 rounded-md my-3 hover:bg-green-900 hover:shadow-lg hover:scale-105 transition-all">Calculate</button>
</form></div>




