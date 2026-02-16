import Problem from "../models/problem.model.js";
import Topic from "../models/topic.model.js";
import Progress from "../models/progress.model.js";

export const createTopic = async(req,res)=>{
 try {
    const {title} = req.body;
    const topic = await Topic.create({title});
    return res.status(201).json(topic)
 } catch (error) {
    return res.status(500).json({message:error.message || "error while creating topic"})
 }
}

export const getAllTopics = async(req,res)=>{
    try {
        const topics = await Topic.find();
        const topicWithcount = await Promise.all(
            topics.map(async (topic)=>{
                const count = await Problem.countDocuments({
                    topic:topic._id,
                })
                return {
                    ...topic._doc,
                    problemCount:count
                }
            })
        )
        return res.status(200).json(topicWithcount)
    } catch (error) {
            return res.status(500).json({message:error.message || "error while getting all topics"})
    }
}


export const getTopicsWithProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    const topics = await Topic.find();

    const result = await Promise.all(
      topics.map(async (topic) => {
        const problems = await Problem.find({
          topic: topic._id,
        });

        const problemIds = problems.map(
          (p) => p._id
        );

        const total = problemIds.length;

        const completed =
          await Progress.countDocuments({
            user: userId,
            problem: { $in: problemIds },
            completed: true,
          });

        const percent =
          total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
              );

        return {
          ...topic._doc,
          total,
          completed,
          percent,
        };
      })
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};