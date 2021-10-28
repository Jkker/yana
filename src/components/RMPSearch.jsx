import React from 'react';
const BASE_URL = 'https://www.ratemyprofessors.com/search/teachers?query=';

export default function RMPSearch(props) {
  const instructors = parseInstructors(props.instructors);
  if (!instructors) return <div>No Instructor Available for This Class</div>;

  return (
    <ul>
      {instructors.map((i) => (
        <li>
          <h3>{i}</h3>
          <em>{BASE_URL + encodeURIComponent(i)}</em>
          <iframe
            title={i}
            src={BASE_URL + encodeURIComponent(i)}
            style={{ width: '100%', height: '300px' }}
          />
        </li>
      ))}
    </ul>
  );
}

const parseInstructors = (instructors) => {
  if (!instructors || instructors === 'staff') {
    return false;
  }
  return instructors.split(',').map((i) => {
    const nameArr = i.split(' ');
    return `${nameArr[0]} ${nameArr[nameArr.length - 1]}`;
  });
};

const getSearchResults=async(query)=> {
  const res = await fetch('')

}