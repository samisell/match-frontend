import { authService } from './auth.service';
import { userService } from './user.service';
import { photoService } from './photo.service';

/**
 * This is an example of how to use the API services in your components.
 */
async function activeUsageExample() {
    try {
        // 1. Register a user
        const registerResponse = await authService.register({
            name: 'Jane Doe',
            email: 'jane@example.com',
            password: 'password123',
            password_confirmation: 'password123'
        });
        console.log('Registered:', registerResponse);

        // 2. Login (if not auto-logged in)
        const loginResponse = await authService.login({
            email: 'jane@example.com',
            password: 'password123'
        });
        console.log('Logged in:', loginResponse);

        // Store token (handled by your auth context usually, but for raw usage:)
        localStorage.setItem('token', loginResponse.access_token);

        // 3. Upload a photo
        // Needs a real File object in browser
        // const file = new File(["foo"], "foo.txt", { type: "text/plain" });
        // const photo = await photoService.uploadPhoto({
        //   user_id: loginResponse.user.id,
        //   photo: file,
        //   caption: 'My first photo',
        //   is_primary: true
        // });
        // console.log('Photo uploaded:', photo);

        // 4. Get all users
        const users = await userService.getUsers();
        console.log('Users:', users);

    } catch (error) {
        console.error('Example error:', error);
    }
}
