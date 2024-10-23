export default function UserInfo({
  userName,
  fullName,
  bio,
  birthDate,
  followers,
  followings,
  posts,
}) {
  return (
    <div className="user-info">
      <h4>Username: {userName}</h4>
      <h4>Fullname: {fullName}</h4>
      <h4>Bio: {bio}</h4>
      <h4>Birth date: {birthDate}</h4>
      <h4>Followers: {followers}</h4>
      <h4>Followings: {followings}</h4>
      <h4>Posts: {posts}</h4>
    </div>
  );
}
