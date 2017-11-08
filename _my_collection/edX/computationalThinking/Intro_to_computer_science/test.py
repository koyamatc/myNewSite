q = "1"
n = "6"
low = 2
high = int("9" * int(n))
primes = [1,2,3,5,7,11,13,17,19,23,29,31,37,41]
checkList = []
print(high)

for i in range(int(q)):
  count = 0
  for num in range(low, high):
    checkNum = "0" * (int(n) - len(str(num))) + str(num)
    for j in range(int(n)-2):
      sum = int(checkNum[j]) + int(checkNum[j+1]) + int(checkNum[j+2])
      checkList.append(sum)
    for j in range(int(n)-3):
      sum = int(checkNum[j]) + int(checkNum[j+1]) + int(checkNum[j+2])  + int(checkNum[j+3])
      checkList.append(sum)  
    for j in range(int(n)-4):
      sum = int(checkNum[j]) + int(checkNum[j+1]) + int(checkNum[j+2])  + int(checkNum[j+3]) + int(checkNum[j+4])
      checkList.append(sum)  

#    print(checkList)
#    break

    result = False
    for sum in checkList:
      result = False
      if sum in primes:
        result = True
      else:
        result = False
        break

    if result:         
        count += 1

  print(count)    


    
  