// Fake database
const db = {
  courses: [
    {
      _id: '66f28c421e0ebc6def357c5',
      courseId: 'COURSE-1001',
      problemIds: [],
      courseName: 'ICPC Beginner'
    },
    {
      _id: '66f28dd81e0ebc6def357c7',
      courseId: 'COURSE-2002',
      problemIds: [],
      courseName: 'ICPC Intermediate'
    }
  ],

  users: [
    {
      _id: '667d848bce9f1e40bd80862',
      email: 'test_email1@gmail.com',
      password: 's2b$1o9tghQP.a5hh!H2sBkMsgkHoFZjHjrSsYDssbOr8/3u!de3Joa3WaITBS',
      role: 'student',
      courses: ['COURSE-1001', 'COURSE-2002']
    },
    {
      _id: '66f28e41e0ebc6def357ca',
      email: 'teacher@gmail.com',
      password: 's2b$1o9tghQP.a5hh!H2sBkMsgkHoFZjHjrSsYDssbOr8/3u!de3Joa3WaITBS',
      role: 'teacher',
      courses: ['COURSE-1001']
    }
  ],

  problems: [
    {
      _id: '66fdbd5a2d0b7693b47909',
      title: 'Problem 1',
      description: 'This is the first problem description.'
    },
    {
      _id: 'anotherProblemId',
      title: 'Problem 2',
      description: 'This is the second problem description.'
    }
  ]
};

// Function to get a user by email
export function getUserByEmail(email) {
  const user = db.users.find(user => user.email === email);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

// Function to create a new course
export function createCourse(courseId, teacherId, problemIds = []) {
  const newCourse = {
    _id: `course-${Date.now()}`,
    courseId,
    teacherId,
    problemIds,
    courseName: `Course ${courseId}`
  };
  db.courses.push(newCourse);
  return newCourse;

}

// Function to fetch a specific course by courseId
export function fetchCourse(courseId) {
  const course = db.courses.find(course => course.courseId === courseId);
  if (!course) {
    throw new Error('Course not found');
  }

  // Fetch problems for the course by their IDs
  const problems = course.problemIds.map(problemId =>
    db.problems.find(problem => problem._id === problemId)
  );
  return { ...course, problems }; // Return course with problem details
}

// Function to add a problem ID to a course's problemIds array
export function addProblemID(courseId, problemId) {
  const course = db.courses.find(course => course.courseId === courseId);
  if (!course) {
    throw new Error('Course not found'); // This is where the error is thrown
  }
  
  if (!course.problemIds.includes(problemId)) {
    course.problemIds.push(problemId);
    console.log(`Problem ID ${problemId} added to course ${courseId}`);
  } else {
    console.log(`Problem ID ${problemId} already exists in course ${courseId}.`);
  }

  return course;
}

// Function to delete a course by courseId
export function deleteCourse(courseId) {
  const courseIndex = db.courses.findIndex(course => course.courseId === courseId);
  if (courseIndex !== -1) {
    db.courses.splice(courseIndex, 1);
    return { success: true };
  } else {
    throw new Error('Course not found');
  }
}

// Function to get courses for a specific user by userId
export function getCoursesByUser(userId) {
  const user = db.users.find(user => user._id === userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Fetch courses based on user's enrolled courses
  const userCourses = user.courses.map(courseId =>
    db.courses.find(course => course.courseId === courseId)
  );

  return userCourses;
}

// Function to add a course to a user
export function addCourseToUser(userId, courseId) {
  const user = db.users.find(user => user._id === userId);
  const course = db.courses.find(course => course.courseId === courseId);
  if (user && course) {
    user.courses.push(courseId);
    return user;
  } else {
    throw new Error('User or course not found');
  }
}

// Function to delete a course from a user
export function deleteCourseFromUser(userId, courseId) {
  const user = db.users.find(user => user._id === userId);
  if (user) {
    user.courses = user.courses.filter(c => c !== courseId);
    return user;
  } else {
    throw new Error('User not found');
  }
}
