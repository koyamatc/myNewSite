n = 7
scores = [100,100,50,40,40,20,10]
m = 4
alice = [5,25,50,120]

scores = list(set(scores))
scores.sort()

for i in alice:
    if i in scores:
        pass
    else:
        scores.append(i)
        scores.sort()
        print(scores)

    print(len(scores)- scores.index(i))            
             
