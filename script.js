let selectedLocker = null;

function showLockers(location) {
  const lockers = {
    DPT: ['D001','D002','D003','D004'],
    Gym: ['G001','G002','G003']
  };
  const lockerSection = document.getElementById('lockers');
  lockerSection.innerHTML = lockers[location].map(id => 
    `<button id="${id}" class="locker-btn" onclick="bookLocker('${id}')">${id}</button>`
  ).join('');
}

function bookLocker(lockerId) {
  selectedLocker = lockerId;
  document.getElementById('bookingForm').style.display = 'block';
  // Highlight selected locker
  document.querySelectorAll('.locker-btn').forEach(btn => btn.classList.remove('selected'));
  document.getElementById(lockerId).classList.add('selected');
}

function confirmBooking() {
  const studentId = document.getElementById('studentId').value.trim();
  const fullName = document.getElementById('fullName').value.trim();
  const date = document.getElementById('date').value;
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;

  if (!studentId || !fullName || !date || !startTime || !endTime) {
    alert("Please fill in all fields before confirming.");
    return;
  }

  const info = `Locker: ${selectedLocker}<br>
                Student: ${fullName} (${studentId})<br>
                Date: ${date}<br>
                Time: ${startTime} - ${endTime}`;
  document.getElementById('infoText').innerHTML = info;

  document.getElementById('bookingForm').style.display = 'none';
  document.getElementById('bookingInfo').style.display = 'block';

  document.getElementById('qrcode').innerHTML = "";
  new QRCode(document.getElementById("qrcode"), 
    `Locker:${selectedLocker}|Student:${studentId}|Date:${date}|Time:${startTime}-${endTime}`);
}

function completeBooking() {
  alert("Booking marked as complete!");
  reset();
}

function cancelBooking() {
  alert("Booking cancelled.");
  reset();
}

function closeForm() {
  document.getElementById('bookingForm').style.display = 'none';
}

function reset() {
  document.getElementById('bookingInfo').style.display = 'none';
  document.getElementById('bookingForm').style.display = 'none';
  document.getElementById('lockers').innerHTML = '';
  selectedLocker = null;
}
