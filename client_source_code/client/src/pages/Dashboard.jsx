import { useEffect, useState } from "react";
import API from "../api/axios";

const Dashboard = () => {
  const [topics, setTopics] = useState([]);
  const [openTopic, setOpenTopic] = useState(null);
  const [problems, setProblems] = useState({});
  const [progressMap, setProgressMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const [topicsRes, progressRes] = await Promise.all([
          API.get("/topics/with-progress"),
          API.get("/progress"),
        ]);

        setTopics(topicsRes.data);

        const map = {};
        progressRes.data.forEach((p) => {
          map[p.problem._id] = p.completed;
        });

        setProgressMap(map);
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const toggleTopic = async (topicId) => {
    if (openTopic === topicId) {
      setOpenTopic(null);
      return;
    }

    if (!problems[topicId]) {
      try {
        const res = await API.get(`/problems/${topicId}`);

        setProblems((prev) => ({
          ...prev,
          [topicId]: res.data,
        }));
      } catch (err) {
        console.error("Problem load error:", err);
      }
    }

    setOpenTopic(topicId);
  };

  const handleToggle = async (topicId, problemId) => {
    const newStatus = !progressMap[problemId];

    try {
      const res = await API.post("/progress", {
        problemId,
        completed: newStatus,
      });

      setProgressMap((prev) => ({
        ...prev,
        [problemId]: res.data.completed,
      }));

      setTopics((prevTopics) =>
        prevTopics.map((topic) => {
          if (topic._id !== topicId) return topic;

          const updatedCompleted = res.data.completed
            ? topic.completed + 1
            : topic.completed - 1;

          const updatedPercent =
            topic.total === 0
              ? 0
              : Math.round((updatedCompleted / topic.total) * 100);

          return {
            ...topic,
            completed: updatedCompleted,
            percent: updatedPercent,
          };
        }),
      );
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-300 px-12 py-10">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          DSA Sheet Dashboard
        </h1>
        <p className="text-gray-500 mt-2">Track your preparation progress</p>
      </div>

      <div className="space-y-8">
        {topics.map((topic) => {
          const topicProblems = problems[topic._id] || [];

          const total = topic.total;
          const completed = topic.completed;
          const percent = topic.percent;

          return (
            <div
              key={topic._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div
                onClick={() => toggleTopic(topic._id)}
                className="flex justify-between items-center px-8 py-6 bg-blue-400 text-white cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <h2 className="text-2xl font-semibold">{topic.title}</h2>

                  <span
                    className={`px-4 py-1 text-sm rounded-full font-medium ${
                      percent === 100
                        ? "bg-green-500"
                        : percent > 0
                          ? "bg-yellow-400 text-black"
                          : "bg-red-500"
                    }`}
                  >
                    {percent === 100
                      ? "Completed"
                      : percent > 0
                        ? "In Progress"
                        : "Pending"}
                  </span>

                  {total > 0 && (
                    <span className="text-sm opacity-90">
                      {completed}/{total} Done
                    </span>
                  )}
                </div>

                <div className="text-2xl">
                  {openTopic === topic._id ? "▲" : "▼"}
                </div>
              </div>

              {openTopic === topic._id && (
                <div className="p-8 overflow-x-auto">
                  {topicProblems.length === 0 ? (
                    <p className="text-gray-500">No problems added yet.</p>
                  ) : (
                    <table className="w-full text-base">
                      <thead>
                        <tr className="border-b text-left">
                          <th className="pb-4"></th>
                          <th>Name</th>
                          <th>LeetCode</th>
                          <th>YouTube</th>
                          <th>Article</th>
                          <th>Level</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {topicProblems.map((problem) => (
                          <tr
                            key={problem._id}
                            className="border-b hover:bg-gray-50 transition"
                          >
                            <td className="py-4">
                              <input
                                type="checkbox"
                                checked={progressMap[problem._id] || false}
                                onChange={() =>
                                  handleToggle(topic._id, problem._id)
                                }
                                className="w-4 h-4"
                              />
                            </td>

                            <td className="py-4 font-medium">
                              {problem.title}
                            </td>

                            <td>
                              <a
                                href={problem.leetcodeLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 underline"
                              >
                                Practice
                              </a>
                            </td>

                            <td>
                              <a
                                href={problem.youtubeLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 underline"
                              >
                                Watch
                              </a>
                            </td>

                            <td>
                              <a
                                href={problem.articleLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 underline"
                              >
                                Read
                              </a>
                            </td>

                            <td>
                              <span
                                className={`px-3 py-1 rounded text-sm font-medium ${
                                  problem.difficulty === "Easy"
                                    ? "bg-green-100 text-green-700"
                                    : problem.difficulty === "Medium"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                }`}
                              >
                                {problem.difficulty}
                              </span>
                            </td>

                            <td className="font-semibold">
                              {progressMap[problem._id] ? "Done" : "Pending"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
