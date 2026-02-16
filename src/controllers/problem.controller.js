import Problem from "../models/problem.model.js";
import Topic from "../models/topic.model.js";



export const createProblem = async(req,res)=>{
    try {
        const { topicId, problems } = req.body;

    if (!topicId) {
      return res.status(400).json({ message: "topicId is required" });
    }

    if (!Array.isArray(problems) || problems.length === 0) {
      return res.status(400).json({ message: "problems array is required" });
    }

    const topicExist = await Topic.findById(topicId);
    if (!topicExist) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // Attach topicId to every problem
    const problemsWithTopic = problems.map((problem) => ({
      ...problem,
      topic: topicId,
    }));

    const createdProblems = await Problem.insertMany(problemsWithTopic);

    return res.status(201).json(createdProblems);
    } catch (error) {
         return res.status(500).json({message:error.message || "error while creating problem ..."})
    }
}

export const getProblemsByTopic  = async(req,res)=>{
try {
    const {topicId} = req.params;
    const problem = await Problem.find({
        topic:topicId,
    }).sort({createdAt:1});
    return res.status(200).json(problem)
} catch (error) {
        return res.status(500).json({message:error.message || "error while fetcing getProblemsByTopic "})
}
}
