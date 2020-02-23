def count_th(word):

   if(len(word) < 2):
       return 0
   else:
       sum = 0
       if word[:2] == 'th':
           sum += 1
          
       return count_th(wordg[1:]) + sum
   

print(count_th('thwtttth'))
    