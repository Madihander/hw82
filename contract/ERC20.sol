// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.19;


contract ERC20standard {
    address _owner = address(0);
    uint256 _totalSupply = 0;
    string _name;
    string _symbol;
    uint8 _decimals;

    mapping(address => uint256) balances;

    // 1) address - from - у кого берут разрешение на трату его токенов
    // 2) address - spender - адрес, который получил разрешение
    // 3) uint256 - количество токенов from'a, который spender может вообще потратить(общая сумма)
    mapping(address => mapping(address => uint256)) allowed;

    event Transfer(address from, address to, uint256 amount);
    event Approval(address from, address to, uint256 amount);

    constructor(string memory name_, string memory symbol_, uint8 decimals_, uint256 amount){
        _owner = msg.sender;
        _name = name_;
        _symbol = symbol_;
        _decimals = decimals_;
        _totalSupply = amount;
        balances[msg.sender] = amount;
    }

    function name() external view returns(string memory) {
        return _name;
    }

    function symbol() external view returns(string memory) {
        return _symbol;
    }

    function decimals() external view returns(uint256) {
        return _decimals;
    }

    function totalSupply() external view returns(uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) external view returns(uint256) {
        return balances[account];
    }

    function transfer(address to, uint256 amount) external returns(bool) {
        require(balances[msg.sender] >= amount,"ERC20: not enough tokens");
        // Защита от Overflow
        require(amount <= balances[msg.sender],"Error: Overflow");
        balances[msg.sender] -=  amount;

        balances[to] += amount;
        // Защита от Overflow
        require(balances[to] >= amount,"Error: Overflow");
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns(bool) {
        require(balances[msg.sender] >= amount,"ERC20: not enough tokens");
        allowed[msg.sender][spender] = amount;
        emit Approval(msg.sender,spender,amount);
        return true;
    }

    function allowance(address owner, address spender) view external returns(uint256) {
        return allowed[owner][spender];
    }

    function transferFrom(address from, address to, uint256 amount) external returns(bool) {
        require(balances[from] >= amount,"ERC20: not enough tokens");
        require(allowed[from][msg.sender] > 0, "ERC20: no permission to spend");
        require(allowed[from][msg.sender] >= amount,"ERC20: in Allowed balance not enough tokens");

        balances[from] -= amount;
        allowed[from][msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(from, to, amount);
        emit Approval(from, msg.sender, allowed[from][msg.sender]);

        return true;

    }

    function mint(address to, uint256 amount) external returns(bool) {
        require(msg.sender == _owner, "You aren't owner");
        _totalSupply += amount;
        balances[to] += amount;
        emit Transfer(address(0), to, amount);
        return true;
    }

    function burn(uint256 amount) external returns(bool) {
        require(amount <= _totalSupply,"ERC20: not enough tokens");
        require(balances[msg.sender] >= amount,"ERC20: not enough tokens on wallet");
        _totalSupply -= amount;
        balances[msg.sender] -= amount;
        emit Transfer(msg.sender ,address(0), amount);
        return true;
    }

    function increaseAllowance(address sender,uint256 addValue) external returns(bool) {
        require(allowed[msg.sender][sender] > 0,"ERC20: error");
        allowed[msg.sender][sender] += addValue;
        emit Approval(msg.sender, sender, allowed[msg.sender][sender]);
        return true;
    }

    function decreaseAllowance(address sender,uint256 subtractValue) external returns(bool) {
        require(allowed[msg.sender][sender] >= subtractValue,"ERC20: error");
        allowed[msg.sender][sender] -= subtractValue;
        emit Approval(msg.sender, sender, allowed[msg.sender][sender]);
        return true;
    }


}