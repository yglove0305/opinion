const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const app = express();
const port = 3000;

// 의견 저장을 위한 배열
const comments = [];

// Body parser 설정
app.use(bodyParser.json());
app.use(express.static('public')); // 정적 파일 제공

// 의견 입력 처리
app.post('/submit', (req, res) => {
    const comment = req.body.comment;

    // Bash 스크립트를 실행해 의견 저장
    exec(`echo "${comment}" >> comments.txt`, (error, stdout, stderr) => {
        if (error) {
            console.error(`에러 발생: ${error}`);
            res.status(500).send('의견 저장 중 오류 발생');
            return;
        }
        comments.push(comment); // 메모리에도 저장
        res.status(200).send('의견 저장 성공');
    });
});

// 모든 의견 보기 처리
app.get('/comments', (req, res) => {
    res.json(comments);
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
