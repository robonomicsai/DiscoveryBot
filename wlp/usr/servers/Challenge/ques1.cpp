#include <stdio.h>
#include<strings.h>
//using namespace std;
 
int main() {
    int t;
    cin>>t;
    
    while(t--) {
        
        int n;
        bool b1,b2,b3,b4,b5;
        b1 = b2 = b3 = b4 = b5 = false;
        char str[16];
        
        cin>>n;
        if (n>=5) {
            while(n>=0) {
                gets(str);
                if (strcmp(str,"cakewalk")==0) {
                    b1 = true;
                }
                else if (strcmp(str,"simple")==0) {
                    b2 = true;
                }
                else if (strcmp(str,"easy")==0) {
                    b3 = true;
                }
                else if (strcmp(str,"easy-medium")==0 || strcmp(str,"medium")==0) {
                    b4 = true;
                }
                else if (strcmp(str,"medium-hard")==0 || strcmp(str,"hard")==0) {
                    b5 = true;
                }
                n = n-1;
            }
            if (b1==true && b2==true && b3==true && b4==true && b5==true) {
                cout<<"Yes";
            }
        else 
            cout<<"No";   
        }
    }
    return 0;
} 