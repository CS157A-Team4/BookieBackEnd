import java.util.*;
class Solution {
    public int trap() {
        String input = "0,1,0,2,1,0,1,3,2,1,2,1";
        String[] parts = input.split(",");
        int[] height = new int[parts.length];
        for(int index = 0; index < parts.length; index++) {
            String part = parts[index].trim();
            height[index] = Integer.parseInt(part);
        }
        Stack blah = new Stack<Integer>();
        int total = 0;
        int tmp  = 0;
        boolean oh = true;
        while(oh){
            oh = false;
            for(int i = 0; i<height.length; i++){
                if(0 < height[i]){
                    oh = true;
                }
            }
            if(oh == false){
                break;
            }
            for(int j =0; j<height.length; j++){
                if(!blah.empty() && height[j] == 0){
                    tmp++;
                }
                else{
                    if(height[j] > 0){
                        if(!blah.empty()){
                            blah.pop();
                            total += tmp;
                            tmp = 0;
                        }
                        else{
                            blah.push(height[j]);
                        }
                    }
                }
                height[j]--;
            }
        }
        
        return total ;
    }
    
}
