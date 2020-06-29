/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-06-19 15:16:34
 */
 #include <stdio.h>
float gety(int x)
{
   /* 局部变量声明 */
   float result;
   if (x < 0) {
       result = x * x;
   } else if ( (x >= 0) && (x < 10) ) {
       result = 10 - 0.5 * x;
   } else {
       result = 0;
   }
   return result;
}

int main(){
    int x;
    float y;
    printf("请输入x:");
    scanf("%d",&x);
    y = gety(x);
    printf("y=%.1f;",y);
    return 0;
}