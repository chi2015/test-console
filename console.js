function Logger() {
    let logger;
    let divWrap;
    let divCheckBoxes;
    let checkBoxes = {};
    let divLogger;
    let loggerArr;
    const MAX_LOGS_COUNT = 100;
    
    
    Logger = function() { return logger; }
    Logger.prototype = this;
    logger = new Logger();
    logger.constructor = Logger;

    let init = () => {
        divWrap = document.createElement('div')
        divWrap.classList.add('console-logger-wrap');
        divCheckBoxes = document.createElement('div')
        divCheckBoxes.classList.add('console-logger-checkboxes');
        initCheckboxes();
        divLogger = document.createElement('div')
        divLogger.classList.add('console-logger');
        divWrap.appendChild(divCheckBoxes);
        divWrap.appendChild(divLogger);
        document.body.appendChild(divWrap);
        loggerArr = [];
    }

    let initCheckboxes = () => {
        let label;
        ['log', 'error', 'info'].forEach((cb_type) => {
            checkBoxes[cb_type] = document.createElement('input');
            checkBoxes[cb_type].type = 'checkbox';
            checkBoxes[cb_type].id = 'logger_cb_'+cb_type;
            checkBoxes[cb_type].setAttribute("checked", "checked");
            checkBoxes[cb_type].setAttribute("onclick", "logger_cb_change(this, '"+cb_type+"')");

            function logger_cb_change(cb_type) {
                loggerArr.filter((log) => log.type == cb_type).forEach((log) => {
                    log.el.style.display = checkBoxes[cb_type].checked ? 'block' : 'none';
                });
                
            };
            
            label = '<label for="'+checkBoxes[cb_type].id+'">'+cb_type+'</label>';
            divCheckBoxes.appendChild(checkBoxes[cb_type]);
            
            
            divCheckBoxes.innerHTML += label;
        });
    }

    let checkDoubleMessage = (msg) => {
        return loggerArr.map((log) => log.msg).indexOf(msg);
    }

    let msgToType = (msg, length) => {
        switch (typeof msg) {
            case "number":
            case "boolean": 
                return '<span class="number">'+msg+'</span>';
            case "string": return length > 1 ? '"<span class="string">'+msg+'</span>"' : msg;
            case "object": return Array.isArray(msg) ? '['+msg.map((msgItem) => msgToType(msgItem, 2)).join(", ") + ']' :
            '{'+ Object.keys(msg).map((key) => key + ' : ' + msgToType(msg[key]) ).join(', ')+ '}';
            case "undefined":
            case "null":
                return '<span class="undefined">'+msg+'</span>';
            case "function":
                return '<span class="function"><span class="number">f</span> '+msg.toString()+'<span>'
        }
    }

    let output = (type, ...args) => {
        let divLogItem = document.createElement('div')
        divLogItem.classList.add('console-logger-item')
        let str = args.map(arg => msgToType(arg, args.length)).join(" ");
        divLogItem.innerHTML = str;
        if (type == 'error') divLogItem.classList.add('error');
        let msg_index = checkDoubleMessage(str);
        
        if (~msg_index) {
            loggerArr[msg_index].count++;
            loggerArr[msg_index].el.innerHTML = '<span class="count">x'+loggerArr[msg_index].count+'</span>'+str;
        }
        else { loggerArr.push({ type: type, msg: str, el: divLogItem, type, count: 1 });

            divLogger.appendChild(divLogItem);
            divLogger.scrollTop = divLogger.scrollHeight;
        }

        if (loggerArr.length) divWrap.style.display = 'block';
        else divWrap.style.display = 'none';
        if (loggerArr.length > MAX_LOGS_COUNT) {
            divLogger.removeChild(loggerArr[0].el);
            loggerArr.splice(0, 1);
        }
    }

    logger.log = (...args) => { return output("log", ...args); }
    logger.info = (...args) => { return output("info", ...args); }
    logger.error = (...args) => { return output("error", ...args); }

    init();
    window.console = logger;
    window.onerror = (message, file, lineNumber) => {
        logger.error(file+':'+lineNumber+ " "+message);
    }
    return logger;
  }


