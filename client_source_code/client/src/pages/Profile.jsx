import { useContext, useEffect, useState } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const [stats, setStats] = useState(null);
  const { user } = useContext(AuthContext);


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/progress/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Stats...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-300 px-12 py-10">
      <h1 className="text-4xl font-bold mb-10">
       Hi, {user.name}
      </h1>

      <div className="grid grid-cols-4 gap-8 mb-12">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h2 className="text-3xl font-bold">
            {stats.totalProblems}
          </h2>
          <p className="text-gray-500 mt-2">
            Total Problems
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h2 className="text-3xl font-bold text-green-600">
            {stats.totalSolved}
          </h2>
          <p className="text-gray-500 mt-2">
            Problems Solved
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h2 className="text-3xl font-bold text-blue-600">
            {stats.percentage}%
          </h2>
          <p className="text-gray-500 mt-2">
            Completion Rate
          </p>
        </div>

        <div className="bg-red-200 shadow rounded-xl p-6 text-center">
          <h2 className="text-3xl font-bold">
            {stats.totalProblems -
              stats.totalSolved}
          </h2>
          <p className="text-gray-500 mt-2">
            Remaining
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-12">
        <h2 className="text-xl font-semibold mb-4">
          Your Progress
        </h2>

        <div className="w-full bg-gray-200 rounded-full h-6">
          <div
            className="bg-green-600 h-6 rounded-full text-white text-center text-sm"
            style={{
              width: `${stats.percentage}%`,
            }}
          >
            {stats.percentage}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="bg-green-100 p-6 rounded-xl shadow text-center">
          <h3 className="text-2xl font-bold text-green-700">
            {stats.easy}
          </h3>
          <p className="mt-2">Easy Solved</p>
        </div>

        <div className="bg-yellow-100 p-6 rounded-xl shadow text-center">
          <h3 className="text-2xl font-bold text-yellow-700">
            {stats.medium}
          </h3>
          <p className="mt-2">Medium Solved</p>
        </div>

        <div className="bg-red-100 p-6 rounded-xl shadow text-center">
          <h3 className="text-2xl font-bold text-red-700">
            {stats.hard}
          </h3>
          <p className="mt-2">Hard Solved</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
