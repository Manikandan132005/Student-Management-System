// Sample data storage
let currentUser = null;
let currentRole = null;
let students = [
    { id: 1, name: "John Doe", class: "10A", email: "john@example.com", attendance: 85, marks: [{subject: "Math", score: 90, grade: "A"}, {subject: "Science", score: 85, grade: "B+"}] },
    { id: 2, name: "Jane Smith", class: "10B", email: "jane@example.com", attendance: 92, marks: [{subject: "Math", score: 95, grade: "A"}, {subject: "Science", score: 88, grade: "B+"}] },
    { id: 3, name: "Mike Johnson", class: "11A", email: "mike@example.com", attendance: 78, marks: [{subject: "Math", score: 75, grade: "C"}, {subject: "Science", score: 80, grade: "B"}] }
];

let teachers = [
    { id: 1, name: "Mr. Anderson", subject: "Mathematics", classes: ["10A", "10B"] },
    { id: 2, name: "Ms. Davis", subject: "Science", classes: ["11A", "11B"] }
];

// Role selection
document.querySelectorAll('.role-card').forEach(card => {
    card.addEventListener('click', function() {
        document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        currentRole = this.dataset.role;
        document.getElementById('loginForm').style.display = 'block';
    });
});

// Login function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        alert('Please enter both username and password');
        return;
    }

    // Role-specific authentication
    let isAuthenticated = false;

    if (currentRole === 'admin') {
        if (username === 'manikandan' && password === 'admin') {
            isAuthenticated = true;
        } else {
            alert('Invalid admin credentials. Hint: manikandan / admin');
        }
    } else if (currentRole === 'teacher') {
        if (username === 'teacher' && password === 'teacher123') {
            isAuthenticated = true;
        } else {
             alert('Invalid teacher credentials. Hint: teacher / teacher123');
        }
    } else if (currentRole === 'student') {
        if (username === 'student' && password === 'student123') {
            isAuthenticated = true;
        } else {
             alert('Invalid student credentials. Hint: student / student123');
        }
    }

    if (!isAuthenticated) {
        return;
    }

    currentUser = { username, role: currentRole };
    
    // Hide login screen and show dashboard
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    
    // Show appropriate dashboard
    document.querySelectorAll('.dashboard-content').forEach(content => content.classList.remove('active'));
    
    if (currentRole === 'admin') {
        document.getElementById('adminDashboard').classList.add('active');
        document.getElementById('dashboardTitle').textContent = 'Admin Dashboard';
        document.getElementById('userInfo').textContent = `Admin: ${username}`;
        loadAdminDashboard();
    } else if (currentRole === 'teacher') {
        document.getElementById('teacherDashboard').classList.add('active');
        document.getElementById('dashboardTitle').textContent = 'Teacher Dashboard';
        document.getElementById('userInfo').textContent = `Teacher: ${username}`;
        loadTeacherDashboard();
    } else if (currentRole === 'student') {
        document.getElementById('studentDashboard').classList.add('active');
        document.getElementById('dashboardTitle').textContent = 'Student Dashboard';
        document.getElementById('userInfo').textContent = `Student: ${username}`;
        loadStudentDashboard();
    }
}

// Logout function
function logout() {
    currentUser = null;
    currentRole = null;
    document.getElementById('loginScreen').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
}

// Load admin dashboard
function loadAdminDashboard() {
    document.getElementById('totalStudents').textContent = students.length;
    document.getElementById('totalTeachers').textContent = teachers.length;
    document.getElementById('totalClasses').textContent = 5;
    document.getElementById('attendanceRate').textContent = '85%';
    
    // Load student table
    const tbody = document.getElementById('studentTableBody');
    tbody.innerHTML = '';
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${student.email}</td>
            <td>${student.attendance}%</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-small btn-edit" onclick="editStudent(${student.id})">Edit</button>
                    <button class="btn-small btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load teacher dashboard
function loadTeacherDashboard() {
    document.getElementById('myClasses').textContent = 2;
    document.getElementById('totalStudentsTeacher').textContent = students.length;
    document.getElementById('todaysAttendance').textContent = '88%';
    
    // Load attendance grid
    const attendanceGrid = document.getElementById('attendanceGrid');
    attendanceGrid.innerHTML = '';
    students.forEach(student => {
        const item = document.createElement('div');
        item.className = 'attendance-item';
        item.innerHTML = `
            <h4>${student.name}</h4>
            <p>Class: ${student.class}</p>
            <p>Attendance: ${student.attendance}%</p>
        `;
        attendanceGrid.appendChild(item);
    });
    
    // Load marks table
    const marksTbody = document.getElementById('marksTableBody');
    marksTbody.innerHTML = '';
    students.forEach(student => {
        student.marks.forEach(mark => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${mark.subject}</td>
                <td>${mark.score}</td>
                <td>${mark.grade}</td>
                <td>
                    <button class="btn-small btn-edit" onclick="editMarks(${student.id}, '${mark.subject}')">Edit</button>
                </td>
            `;
            marksTbody.appendChild(row);
        });
    });
}

// Load student dashboard
function loadStudentDashboard() {
    // Simulate current student data
    const myStudent = students[0];
    document.getElementById('myAttendance').textContent = myStudent.attendance + '%';
    document.getElementById('myGPA').textContent = '8.5';
    document.getElementById('myRank').textContent = '2';
    document.getElementById('attendanceProgress').style.width = myStudent.attendance + '%';
    document.getElementById('attendanceText').textContent = myStudent.attendance + '% attendance rate';
    
    // Load my marks
    const myMarksTbody = document.getElementById('myMarksTableBody');
    myMarksTbody.innerHTML = '';
    myStudent.marks.forEach(mark => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${mark.subject}</td>
            <td>${mark.score}</td>
            <td>${mark.grade}</td>
            <td>Excellent performance!</td>
        `;
        myMarksTbody.appendChild(row);
    });
}

// Modal functions
function openAddStudentModal() {
    document.getElementById('addStudentModal').style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// CRUD operations
function addStudent() {
    const name = document.getElementById('studentName').value;
    const studentClass = document.getElementById('studentClass').value;
    const email = document.getElementById('studentEmail').value;
    
    if (!name || !studentClass || !email) {
        alert('Please fill all fields');
        return;
    }
    
    const newStudent = {
        id: students.length + 1,
        name,
        class: studentClass,
        email,
        attendance: 0,
        marks: []
    };
    
    students.push(newStudent);
    closeModal('addStudentModal');
    loadAdminDashboard();
    
    // Clear form
    document.getElementById('studentName').value = '';
    document.getElementById('studentClass').value = '';
    document.getElementById('studentEmail').value = '';
}

function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (student) {
        const newName = prompt('Enter new name:', student.name);
        if (newName !== null) {
            student.name = newName;
            loadAdminDashboard();
        }
    }
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(s => s.id !== id);
        loadAdminDashboard();
    }
}

function editMarks(studentId, subject) {
    const student = students.find(s => s.id === studentId);
    if (student) {
        const mark = student.marks.find(m => m.subject === subject);
        if (mark) {
            const newScore = prompt('Enter new marks:', mark.score);
            if (newScore !== null && !isNaN(newScore)) {
                mark.score = parseInt(newScore);
                // Recalculate grade
                if (newScore >= 90) mark.grade = 'A';
                else if (newScore >= 80) mark.grade = 'B';
                else if (newScore >= 70) mark.grade = 'C';
                else mark.grade = 'D';
                loadTeacherDashboard();
            }
        }
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}
