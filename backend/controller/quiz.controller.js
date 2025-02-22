const Quiz = require("../models/quizModel");

const quiz = async (req, res) => {
    const { chapterId, type } = req.body;
    let quiz;
    try{

    quiz = await Quiz.create({
        chapterId,
        type,
    });
    }catch(err){
        return res.staus(401).json({
            success:false,
            message:"Could not create Quiz"

        })
    }
};
