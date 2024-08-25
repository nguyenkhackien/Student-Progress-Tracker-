// Danh sách các môn học
const subjects = [
    "Toán",
    "Vật lý",
    "Hóa học",
    "Sinh học",
    "Lịch sử",
    "Địa lý",
    "Ngữ văn",
    "Tiếng Anh",
]

// Hàm sinh dữ liệu ngẫu nhiên
function getRandomSubjects(subjects) {
    const shuffled = subjects.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, num)
}

// Ví dụ: Sinh ngẫu nhiên 3 môn học
const randomSubjects = getRandomSubjects(subjects, 3)
console.log(randomSubjects)
