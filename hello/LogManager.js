import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES modules에서 __dirname 사용을 위한 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 로그 메시지를 오늘 날짜의 로그 파일에 기록하는 함수
 * @param {string} message - 로그 파일에 기록할 메시지
 */
function logMessage(message) {
    try {
        // 오늘 날짜를 YYYY-MM-DD 형식으로 가져오기
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        
        // 로그 파일 이름 생성
        const logFileName = `${dateString}.log`;
        
        // 로그 파일 경로 생성 (현재 디렉토리의 상위 디렉토리의 log 폴더)
        const logFilePath = path.join(__dirname, '..', 'log', logFileName);
        
        // 현재 시간을 포함한 로그 메시지 생성
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] ${message}\n`;
        
        // 로그 디렉토리가 없으면 생성
        const logDir = path.dirname(logFilePath);
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
        
        // 로그 메시지를 파일에 추가
        fs.appendFileSync(logFilePath, logEntry, 'utf8');
        
        console.log(`로그가 기록되었습니다: ${logFilePath}`);
        
    } catch (error) {
        console.error('로그 기록 중 오류 발생:', error.message);
    }
}

export default { logMessage };
