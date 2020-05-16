#include <bits/stdc++.h>
using namespace std;

int main() {
    int ar[102],n,cnt[102] = {0},pairs = 0;
    cin >> n;
    for(int i = 0; i < n; i++) {
        cin >> ar[i];
        cnt[ar[i]]++;
    }
    for(int i = 0; i < 101; i++){
        if(cnt[i]!= 0)pairs+=cnt[i]/2;
    }
    cout << pairs << endl;
    return 0;
}