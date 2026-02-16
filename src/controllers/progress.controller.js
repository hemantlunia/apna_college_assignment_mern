import Problem from "../models/problem.model.js";
import Progress from "../models/progress.model.js";

export const toggleProgress = async (req, res) => {
  try {
    const { problemId, completed } = req.body;
    const progress = await Progress.findOneAndUpdate(
      {
        user: req.user.id,
        problem: problemId,
      },
      { completed },
      { upsert: true, returnDocument:"after" },
    );
    return res.status(200).json(progress);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "error while toggleProgress " });
  }
};

export const getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({
      user: req.user.id,
      completed: true,
    }).populate("problem");

    return res.status(200).json(progress);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "error while getUserProgress " });
  }
};


export const getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // all problems
    const totalProblems = await Problem.countDocuments();

    // all completed progress
    const completedProgress = await Progress.find({
      user: userId,
      completed: true,
    }).populate("problem");

    const totalSolved = completedProgress.length;

    // Difficulty breakdown
    let easy = 0;
    let medium = 0;
    let hard = 0;

    completedProgress.forEach((p) => {
      if (p.problem.difficulty === "Easy") easy++;
      if (p.problem.difficulty === "Medium") medium++;
      if (p.problem.difficulty === "Hard") hard++;
    });

    const percentage =
      totalProblems === 0
        ? 0
        : Math.round((totalSolved / totalProblems) * 100);

    res.status(200).json({
      totalProblems,
      totalSolved,
      percentage,
      easy,
      medium,
      hard,
    });
  } catch (error) {
   return res.status(500).json({
      message: error.message || "Error fetching userstats",
    });
  }
};

