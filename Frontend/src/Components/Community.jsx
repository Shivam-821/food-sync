import React from 'react'

const Community = () => {
  return (
    <div className="flex flex-row">
      <div className="flex-grow">
        <CommunityActivity />
      </div>
      <Sidebar />
    </div>
  )
}

const Sidebar = () => {
  return (
    <div className="w-80 flex-shrink-0 p-4">
      <h2 className="text-lg font-bold mb-4">Good to know information</h2>
      <ul className="list-disc pl-5">
        <li>New Here? Start Here!</li>
        <li>Welcome to Community</li>
        <li>Samsung Community: General Guidelines</li>
        <li>Samsung Support Acknowledgement</li>
      </ul>

      <h2 className="text-lg font-bold mt-6 mb-4">Leaderboard</h2>
      <ul>
        <li>Robin621k - 120 ❤</li>
        <li>meself - 91 ❤</li>
        <li>realud - 81 ❤</li>
        <li>Tidbitty - 57 ❤</li>
        <li>3Fees - 57 ❤</li>
      </ul>

      <h2 className="text-lg font-bold mt-6 mb-4">Top Liked Posts</h2>
      <ul>
        <li>One UI 7 Beta - 17</li>
        <li>Wifi calling notification fix, plus update - 14</li>
        <li>Factory Reset Rewarded! - 12</li>
        <li>Dynamic Island - 12</li>
        <li>Slow Processing - 11</li>
      </ul>
    </div>
  );
}

const communityPosts = [
  {
    title: "Choosing a Samsung Sound bar for my Samsung TV Q60T (58”) (2020 model)?",
    content: "Hello I am inquiring on some help in seeking a sound bar with good quality for my now Samsung Q60T (58”) TV. It is a 2020 model. Any suggestions...",
    likes: 0,
    comments: 0
  },
  // More posts...
];

const CommunityActivity = () => {
  return (
    <div className="flex flex-col w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Community Activity</h1>
      {communityPosts.map((post, index) => (
        <div key={index} className="border p-4 mb-4 rounded-md shadow-md">
          <h2 className="font-semibold">{post.title}</h2>
          <p className="text-gray-700">{post.content}</p>
          <div className="flex justify-between text-sm mt-2">
            <span>{post.likes} Likes</span>
            <span>{post.comments} Comments</span>
          </div>
        </div>
      ))}
    </div>
  );
}


export default Community