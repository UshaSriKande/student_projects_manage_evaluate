import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";

const MarksList = () => {
  const { user } = useAuth();
  const [guideData, setGuideData] = useState(null);
  const [reviewNumbers, setReviewNumbers] = useState([]);
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    fetchData();
    fetchReviewNumbers();
  }, [user.username, user.year]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/facultybatches/${user.username}/${user.year}`);
      setGuideData(response.data.groups);
    } catch (error) {
      console.error('Error fetching guide data:', error);
    }
  };

  const fetchReviewNumbers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/get_faculty_rev_numbers/${user.year}`);
      setReviewNumbers(response.data.review_numbers);
    } catch (error) {
      console.error('Error fetching review numbers:', error);
    }
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!reviewNumbers || !guideData) return;

      try {
        const role = user.role;

        const studentDataPromises = guideData.flatMap(group =>
          group.students.map(async student => {
            const studentId = student.studentid;
            const section = student.section;
            const year = student.year;

            const studentReviews = await Promise.all(reviewNumbers.map(async number => {
              try {
                const response = await axios.get(`http://localhost:5000/api/getfacultystudentrev/${number}/${section}/${year}/${studentId}/${role}`);
                console.log("response data is :",response.data);
                return response.data;
                console.log("response data is :",response.data);
              } catch (error) {
                console.error(`Error fetching data for student ${studentId} review ${number}:`, error);
                return null;
              }
            }));

            return {
              studentId,
              studentReviews
            };
          })
        );

        const allStudentData = await Promise.all(studentDataPromises);
        console.log("all students dat ais ",allStudentData);
        setStudentData(allStudentData);

        
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [reviewNumbers, guideData, user.role]);

  return (
    <div>
      <p style={{marginLeft:'500px',fontSize:'30px'}}>List Marks</p>
      {guideData && guideData.map((group, index) => (
        <div key={index} className="table-container" style={{ background: "FFF", marginBottom: '20px' }}>
          <div className="text-with-line" style={{ display: "flex" }}>
            <h2 style={{ paddingRight: "480px" }}>Batch Number: Batch{group.batchNumber}</h2>
            <h4>Guide: {group.guidename}</h4>
          </div>
          <table className="table-rev" style={{ marginTop: '20px',borderCollapse: 'collapse' }}>
            <thead>
              <tr className="table-row">
                <th className="table-head"><p>Student ID</p></th>
                {reviewNumbers && reviewNumbers.map(number => (
                  <th className="table-head" key={number}><p>Review {number}</p></th>
                ))}
              </tr>
            </thead>
            <tbody>
  {group.students && group.students.map((student, studentIndex) => {
    const studentReviews = studentData
      .filter(data => data.studentId === student.studentid)
      .flatMap(data => data.studentReviews || []);

    return (
      <tr className="table-head" key={studentIndex}>
        <td>{student.studentid}</td>
        {studentReviews && studentReviews.map((review, reviewIndex) => (
          <td key={reviewIndex}>{review}</td>
        ))}
      </tr>
    );
  })}
</tbody>


          </table>
          <div className="text-with-line-top" style={{ display: "flex" }}></div>
        </div>
      ))}
    </div>
  );
  
};

export default MarksList;
