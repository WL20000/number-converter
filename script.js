const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
const units = ['', '拾', '佰', '仟'];
const sections = ['', '万', '亿', '万亿'];

function numberToChinese(num) {
    // 处理非法输入
    if (!/^\d+(\.\d{1,2})?$/.test(num)) {
        return '请输入正确的金额格式';
    }

    // 分割整数和小数部分
    let [integer, decimal] = num.toString().split('.');
    let result = '';

    // 处理整数部分
    if (integer === '0') {
        result = '零';
    } else {
        let sectionCount = Math.ceil(integer.length / 4);
        for (let i = 0; i < sectionCount; i++) {
            let section = integer.slice(-4 * (i + 1), -4 * i || undefined);
            let sectionResult = convertSection(section);
            
            if (sectionResult) {
                result = sectionResult + (sections[i] || '') + result;
            }
        }
    }

    // 添加"元"
    result += '元';

    // 处理小数部分
    if (!decimal) {
        result += '整';
    } else {
        decimal = decimal.padEnd(2, '0');
        const jiao = parseInt(decimal[0]);
        const fen = parseInt(decimal[1]);
        
        if (jiao === 0 && fen === 0) {
            result += '整';
        } else {
            if (jiao !== 0) {
                result += digits[jiao] + '角';
            }
            if (fen !== 0) {
                result += digits[fen] + '分';
            }
        }
    }

    return result;
}

function convertSection(section) {
    section = section.padStart(4, '0');
    let result = '';
    let hasZero = false;
    let hasValue = false;
    
    for (let i = 0; i < 4; i++) {
        const digit = parseInt(section[i]);
        
        if (digit === 0) {
            hasZero = true;
        } else {
            if (hasZero && hasValue) {
                result += '零';
            }
            hasZero = false;
            hasValue = true;
            result += digits[digit] + units[3 - i];
        }
    }
    
    return result;
}

function convert() {
    const input = document.getElementById('numberInput').value.trim();
    const result = document.getElementById('result');
    result.textContent = numberToChinese(input);
}

// 添加输入框回车事件监听
document.getElementById('numberInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        convert();
    }
}); 
