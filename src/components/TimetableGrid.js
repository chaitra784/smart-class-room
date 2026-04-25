export default function TimetableGrid({ data }) {
  return (
    <div>
      {data.map((item, i) => (
        <div key={i}>
          {item.day} | {item.time} | {item.subject}
        </div>
      ))}
    </div>
  );
}