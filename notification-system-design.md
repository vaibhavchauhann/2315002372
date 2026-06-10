Stage 1:

Occupied my token and ids from Postman, then created these files in JavaScript.

Approach
Fetch all notifications from API, sort by priority and recency, return top N.

Priority Order should be like this given below:
Placement = highest
Result = medium  
Event = lowest

Algo:
1.Fetch notifications from API
2.Sort by priority, then by timestamp (newest first)
3.Return top N notifications