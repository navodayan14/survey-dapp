
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Voting{

mapping(address=>bool) public isVoted;
address [] public peopleVoted;

string []public votingOptions;
uint256 public startDelay;
uint256 public duration;

uint256 []  private resultArr;
address public admin;
uint256 public creatingTime;


mapping (string=>uint256) public findind;   
enum Stages{wait,voting,result}
Stages stage;



constructor() public {
 admin=msg.sender;
}



event Voted(address indexed _from,string indexed _to);
event NewVoting(uint256 indexed _options,uint256 _delay,uint256 _duration);





function updateTime() internal
{
if(creatingTime+startDelay*1 minutes<=block.timestamp && block.timestamp<=creatingTime+startDelay*1 minutes+duration*1 minutes)
{
 stage=Stages.voting;
}

else if(block.timestamp>=creatingTime+startDelay*1 minutes+duration*1 minutes)
{
 stage=Stages.result;
}
}



modifier onlyByAdmin(address user)
{
 require(user==admin,'invalid person');
 _;
}



function destroyVoting ()internal {
for(uint256 i=0;i<peopleVoted.length;i++)
{
 delete(isVoted[peopleVoted[i]]);
}

delete(peopleVoted);

for(uint256 i=0;i<votingOptions.length;i++)
 delete(findind[votingOptions[i]]);
delete(resultArr);
delete(votingOptions);

creatingTime=0;
}





function newVoting(string [] memory _options,uint256 _startDelay,uint256 _duration) public onlyByAdmin(msg.sender){
destroyVoting();

for(uint256 i=0;i<_options.length;i++)
{
votingOptions.push(_options[i]);
 findind[_options[i]]=i+1;
 resultArr.push(0);
}

startDelay=_startDelay;
duration=_duration;
stage=Stages.wait;
creatingTime=block.timestamp;
emit NewVoting(_options.length,_startDelay,_duration);
}


modifier onlyNonVoted(address user)
{
 
 require(isVoted[user]==false,'already voted');
 _;
}


modifier onlyVotingTime()
{
 updateTime();
 require(stage==Stages.voting,'not voting time');
 _;
}



modifier correctOptions(string  memory _option )
{
   require(findind[_option]>0,'not a valid option');
 _;
}


function giveVote(string memory _option) public correctOptions(_option)  onlyNonVoted(msg.sender) onlyVotingTime{
   isVoted[msg.sender]=true;
   peopleVoted.push(msg.sender);
   resultArr[findind[_option]-1]+=1;
   emit Voted(msg.sender,_option);
}




function showResult() external view  returns(uint256 [] memory,string [] memory){
   
  return (resultArr,votingOptions);
}

function showOptions() external view returns(string [] memory)
{
   return votingOptions;
}

}