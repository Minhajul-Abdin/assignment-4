let interviewList = [];
let rejectedList = [];
let removedarry = [];
let current = "all-application-btn";

let totalApplicationNumber = document.getElementById("total-application-number");
let totalInterviewNumber = document.getElementById("total-interview-number");
let totalRejectNumber = document.getElementById("total-rejected-number");

const allApplicationBtn = document.getElementById("all-application-btn");
const allInterviewBtn = document.getElementById("all-interview-btn");
const allRejectedBtn = document.getElementById("all-rejected-btn");

const interviewsection = document.getElementById("interview");
const rejectSection = document.getElementById("reject");
const nosection = document.getElementById("no-applicaton");

const availableApplication = document.getElementById("Available-application-number");

const allapplicationsection = document.getElementById(
  "all-application-section",
);
const mainConainer = document.getElementById("main-container");



function deleteContainer() {
  mainConainer.addEventListener("click", function (event) {
    //console.log("working?")
    if (event.target.classList.contains("del-btn")) {
      const card = event.target.closest(".applications-container");
      const jobTitleDelt = card.querySelector(".job-title").innerText;
      card.parentNode.removeChild(card);
      const remainingData = interviewList.filter(
        (item) => item.jobTitle != jobTitleDelt,
      );

      interviewList = remainingData;

      const remainingDataForReject = rejectedList.filter(
        (item) => item.jobTitle != jobTitleDelt,
      );

      rejectedList = remainingDataForReject;

      rejectCount();
      interviewCount();
      makecardelement();
      makecardelementRejective();
      calculateCount();
      togglebtn(current);
    }
  });
}


mainConainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("interview-btn")) {
    const parentN = event.target.parentNode.parentNode;

    const jobTitle = parentN.querySelector(".job-title").innerText;
    const jobRole = parentN.querySelector(".job-role").innerText;
    const jobInfo = parentN.querySelector(".job-info").innerText;
    const jobState = parentN.querySelector(".job-state");
    const jobMore = parentN.querySelector(".job-more-info").innerText;

    jobState.innerText = "INTERVIEW";
    jobState.classList.remove("bg-[#EEF4FF]", "bg-red-200");
    parentN.querySelector(".job-state").classList.add("bg-green-200", "text-black");

    const alljobinfo = {
      jobTitle,
      jobRole,
      jobInfo,
      jobState: "INTERVIEW",
      jobMore,
    };

    const jobMatch = interviewList.find(
      (item) => item.jobTitle == alljobinfo.jobTitle,
    );
    rejectedList = rejectedList.filter(
      (item) => item.jobTitle != alljobinfo.jobTitle,
    );

    if (current == "all-rejected-btn") {
      makecardelementRejective();
    }

    if (!jobMatch) {
      interviewList.push(alljobinfo);
    }
    calculateCount();
    rejectCount();
    togglebtn(current);
  } else if (event.target.classList.contains("rejected-btn")) {
    const parentN = event.target.parentNode.parentNode;

    const jobTitle = parentN.querySelector(".job-title").innerText;
    const jobRole = parentN.querySelector(".job-role").innerText;
    const jobInfo = parentN.querySelector(".job-info").innerText;
    const jobState = parentN.querySelector(".job-state").innerText;
    const jobMore = parentN.querySelector(".job-more-info").innerText;

    parentN.querySelector(".job-state").innerText = "REJECTED";
    parentN.querySelector(".job-state").classList.remove("bg-[#EEF4FF]");
    parentN.querySelector(".job-state").classList.add("bg-red-200", "text-black");

    const alljobinfo = {
      jobTitle,
      jobRole,
      jobInfo,
      jobState: "REJECTED",
      jobMore,
    };

    const jobMatch = rejectedList.find(
      (item) => item.jobTitle == alljobinfo.jobTitle,
    );
    interviewList = interviewList.filter(
      (item) => item.jobTitle != alljobinfo.jobTitle,
    );

    if (current == "all-interview-btn") {
      makecardelement();
    }

    if (!jobMatch) {
      rejectedList.push(alljobinfo);
    }
    calculateCount();
    interviewCount();
    togglebtn(current);
  }
});

function makecardelement() {
  interviewsection.innerHTML = "";
  for (let list of interviewList) {
    let div = document.createElement("div");
    div.id = "applications-container-id";
    div.className =
      "applications-container w-full flex justify-between p-6 bg-white rounded mb-4";
    div.innerHTML = `
    <div class="aplication-info">
            <h1 class="job-title text-[#002C5C] font-semibold text-[18px]">
              ${list.jobTitle}
            </h1>
            <p class="job-role text-[#64748B]">${list.jobRole}</p>
            <p class="job-info text-[#64748B] text-sm py-6">
              ${list.jobInfo}
            </p>
            <span
              class="job-state bg-green-200 py-[12px] px-[8px] text-sm font-medium text-black rounded-s-md"
              >${list.jobState}</span
            >
            <p class="job-more-info pt-3 pb-6">
              ${list.jobMore}
            </p>
            <div class="btn-container">
              <button
                class="interview-btn btn btn-outline btn-success font-semibold text-sm uppercase"
              >
                Interview
              </button>
              <button
                class="rejected-btn btn btn-outline btn-error font-semibold text-sm uppercase"
              >
                Rejected
              </button>
            </div>
          </div>
          <div class="del-btn">
            <button
              onclick="deleteContainer()"
              class="del-btn btn btn-soft p-3 bg-white rounded-full"
            >
              <i class="del-btn fa-regular fa-trash-can text-[#64748B]"></i>
            </button>
          </div>
    `;

    interviewsection.appendChild(div);
  }
}

function makecardelementRejective() {
  rejectSection.innerHTML = "";
  for (let rejectlist of rejectedList) {
    let div = document.createElement("div");
    div.id = "applications-container-id";
    div.className =
      "applications-container w-full flex justify-between p-6 bg-white rounded mb-4";
    div.innerHTML = `
   <div class="aplication-info">
            <h1 class="job-title text-[#002C5C] font-semibold text-[18px]">
              ${rejectlist.jobTitle}
            </h1>
            <p class="job-role text-[#64748B]">${rejectlist.jobRole}</p>
            <p class="job-info text-[#64748B] text-sm py-6">
              ${rejectlist.jobInfo}
            </p>
            <span
              class="job-state bg-red-200 py-[12px] px-[8px] text-sm font-medium text-black rounded-s-md"
              >${rejectlist.jobState}</span
            >
            <p class="job-more-info pt-3 pb-6">
              ${rejectlist.jobMore}
            </p>
            <div class="btn-container">
              <button
                class="interview-btn btn btn-outline btn-success font-semibold text-sm uppercase"
              >
                Interview
              </button>
              <button
                class="rejected-btn btn btn-outline btn-error font-semibold text-sm uppercase"
              >
                Rejected
              </button>
            </div>
          </div>
          <div class="del-btn">
            <button
              onclick="deleteContainer()"
              class="del-btn btn btn-soft p-3 bg-white rounded-full"
            >
              <i class="del-btn fa-regular fa-trash-can text-[#64748B]"></i>
            </button>
          </div>
    `;

    rejectSection.appendChild(div);
  }
}

function calculateCount() {
  const availableNumber = document.getElementById(
    "Available-application-number",
  );

  totalApplicationNumber.innerText = allapplicationsection.children.length;
  availableNumber.innerText = allapplicationsection.children.length;
  totalInterviewNumber.innerText = interviewList.length;
  totalRejectNumber.innerText = rejectedList.length;

}

function togglebtn(id) {
  allApplicationBtn.classList.remove("bg-[#3B82F6]", "text-white");
  allInterviewBtn.classList.remove("bg-[#3B82F6]", "text-white");
  allRejectedBtn.classList.remove("bg-[#3B82F6]", "text-white");

  allApplicationBtn.classList.add("bg-[#3b83f600]", "text-black");
  allInterviewBtn.classList.add("bg-[#3b83f600]", "text-black");
  allRejectedBtn.classList.add("bg-[#3b83f600]", "text-black");

  const selectedid = document.getElementById(id);
  current = id;
  selectedid.classList.remove("bg-[#3b83f600]");
  selectedid.classList.add("bg-[#3B82F6]", "text-white");

  if (id == "all-interview-btn") {
    allapplicationsection.classList.add("hidden");
    rejectSection.classList.add("hidden");
    interviewsection.classList.remove("hidden");
    if (interviewList.length == 0) {
      nosection.classList.remove("hidden");
    } else {
      nosection.classList.add("hidden");
    }
    makecardelement();
  } else if(id == "all-application-btn"){
    allapplicationsection.classList.remove("hidden");
    interviewsection.classList.add("hidden");
    rejectSection.classList.add("hidden");
    if(parseInt(availableApplication.innerText) == 0){
        console.log("if working");
        const selectedid = document.getElementById("no-applicaton");
        selectedid.classList.remove("hidden");}
        else{
          nosection.classList.add("hidden");
        }

  } else if (id == "all-rejected-btn") {
    allapplicationsection.classList.add("hidden");
    if (rejectedList.length == 0) {
      nosection.classList.remove("hidden");
    } else {
      nosection.classList.add("hidden");
    }
    interviewsection.classList.add("hidden");
    rejectSection.classList.remove("hidden");
    makecardelementRejective();
  }
}
//-----------------------------------
//-----------------------------------
function interviewCount() {
  if (current == "all-interview-btn") {
    const interviewCount = document.getElementById("interview-span");
    const changedCountInterview = document.getElementById(
      "changed-count-interview",
    );
    const changedCountReject = document.getElementById("changed-count-reject");

    interviewCount.innerText = interviewList.length;
    changedCountInterview.classList.remove("hidden");
    changedCountReject.classList.add("hidden");
  }
}

function rejectCount() {
  if (current == "all-rejected-btn") {
    const rejectCount = document.getElementById("reject-span");
    const changedCountReject = document.getElementById("changed-count-reject");
    const changedCountInterview = document.getElementById(
      "changed-count-interview",
    );
    changedCountInterview.classList.add("hidden");
    rejectCount.innerText = rejectedList.length;
    changedCountReject.classList.remove("hidden");
  }
}

function allcount() {
  const changedCountReject = document.getElementById("changed-count-reject");
  const changedCountInterview = document.getElementById(
    "changed-count-interview",
  );
  changedCountInterview.classList.add("hidden");
  changedCountReject.classList.add("hidden");
}

calculateCount();
