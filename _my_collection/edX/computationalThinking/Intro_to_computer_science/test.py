l = []
a = []
a.append(3)
l.append(a)
a = [1]
l.append(a)
a =l[1]
a.append(5)
l[1] = a

print(l)