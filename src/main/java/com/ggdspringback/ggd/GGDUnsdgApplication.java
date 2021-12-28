package com.ggdspringback.ggd;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.ggdspringback.ggd.domain.ActionRepository;
import com.ggdspringback.ggd.domain.BookmarkRepository;
import com.ggdspringback.ggd.domain.MessageRepository;
import com.ggdspringback.ggd.domain.UserRepository;
import com.ggdspringback.ggd.entity.Action;
import com.ggdspringback.ggd.entity.Bookmark;
import com.ggdspringback.ggd.entity.Message;
import com.ggdspringback.ggd.entity.User;

@SpringBootApplication
public class GGDUnsdgApplication {
	@Autowired
	private UserRepository uRepository;
	@Autowired
	private BookmarkRepository bmRepository;
	@Autowired
	private ActionRepository aRepository;
	@Autowired
	private MessageRepository mRepository;
	
	
	public static void main(String[] args) {
		SpringApplication.run(GGDUnsdgApplication.class, args);
	}
	
	@Bean
	CommandLineRunner runner() {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		return args -> { //user and admin accounts test and bookmark
			User userone = new User("user", encoder.encode("user"), "USER", "user@email.com", "John", "Doe");
			User usertwo = new User("admin", encoder.encode("admin"), "ADMIN", "admin@email.com", "Herman", "Hesse");
			User userthree = new User("gan", encoder.encode("admin"), "ADMIN", "gan@email.com", "Gan", "Villaruel");
			User userfour = new User("rishi", encoder.encode("admin"), "ADMIN", "rishiashen@outlook.com", "Rishi", "Ashen");
			User userfive = new User("elroydo", encoder.encode("password"), "ADMIN", "elroy@email.com", "Elroy", "Do Rosario");
					
			Bookmark bm1 = new Bookmark("The Earth is getting hotter...", "the cause of global warming", "The Mantle", "link1", "2020");
			Bookmark bm2 = new Bookmark("iPlane", "recycling good", "Apple", "link2", "2099");
		
			//Climate Actions 
			Action ca1 = new Action("Climate-Action", "Use Energy Wisely","Unplug computers, TVs and other electronics when you’re not using them.", "ggd");
			Action ca2 = new Action("Climate-Action", "Eat for a climate-stable planet", "Eat more meat-free meals & Buy organic and local whenever possible.", "ggd");
			Action ca3 = new Action("Climate-Action", "Green your commute", "Try walking/biking to work today or taking public transport.", "ggd");
			Action ca4 = new Action("Climate-Action", "Waste less Food", "Don't throw any food today - eat it or keep it.", "ggd");
			Action ca5 = new Action("Climate-Action", "Green your commute", "You can: take public transport/ Ride a bike/ Take less flights.", "ggd");
			Action ca6 = new Action("Climate-Action", "Change your shopping habits", "Research into how the companies you shop from produce their products and how it is transported. Buy from eco-friendly stores whenever possible.", "ggd");
			Action ca7 = new Action("Climate-Action", "Leave the car at home", "Cars contribute to greenhouse gas emissions but air pollution caused by exhaust fumes from traffic causes serious threat to public health. You can switch off the engine when you park up today.", "ggd");
			Action ca8 = new Action("Climate-Action", "Respect & Protect green spaces ", "You can create your own green space - add plant pots to your window sill. If you have a garden don't replace the grass with paving or artifical turf.", "ggd");
			Action ca9 = new Action("Climate-Action", "Minimse Waste ", "You can repair & reuse or donate unwanted items to chariity. ", "ggd");
			
			//Life Below Water
			Action wa1 = new Action("Life-Below-Water", "Voice Your Opinon", "Run a campaign on the effects of plastic use on the seas and oceans.", "ggd" );
			Action wa2 = new Action("Life-Below-Water", "Make small changes", "Taking public transport and unplugging electronics saves energy.These actions reduce our carbon footprint a factor that contributes to rising sea levels", "ggd" );
			Action wa3 = new Action("Life-Below-Water", "Conserve Water", "Use less water so excess runoff and wastewater will not flow into the ocean.", "ggd" );
			Action wa4 = new Action("Life-Below-Water", "Sustainable Fishing", "Follow 'catch and release' practices and keep more fish alive.", "ggd" );
			Action wa5 = new Action("Life-Below-Water", "Conserve costal & marine areas", "Anchor in sandy areas far from coral and sea grasses. Adhere to 'no wake' zones.", "ggd" );
			Action wa6 = new Action("Life-Below-Water", "Support small scale fishers", "Buy local and certified fish. You can support small-scale producers by shopping in local markets and shops.", "ggd");
			Action wa7 = new Action("Life-Below-Water", "Reduce waste", "Much of the waste that we produce on land ends up in the oceans. Stop using plastic bags: Usage and wrong disposal of plastic is a major cause of marine pollution.", "ggd" );
			Action wa8 = new Action("Life-Below-Water", "Avoid Products Containing Microbeads", "Tiny plastic particles, called 'microbeads'Microbeads are found in many many products that we use daily, and they readily enter our oceans and waterways through our sewer systems, and affect hundreds of marine species", "ggd" );
			Action wa9 = new Action("Life-Below-Water", "Clean Up", "Organize a cleanup project for rivers and oceans. Engage your whole community to clean up a local river, seaside or an ocean.", "ggd" );
			
			//Life On Land Actions
			Action ol1 = new Action("Life-On-Land", "Take action to conserve/restore terrestrial and freshwater ecosystems", "This could be acheived by supporting/donating to other campaigns or starting one of your own!.", "ggd" );
			Action ol2 = new Action("Life-On-Land", "Raise awareness","Start a campaign to encourage others to help end deforestation which has a negative impact on the enviroment.","ggd"  );
			Action ol3 = new Action("Life-On-Land", "Help reduce/prevent deforestation", "This can be achieved by planting a tree, recycling paper/cardboard and using recycled products.", "ggd" );
			Action ol4 = new Action("Life-On-Land", "Reduce Meat Consumption", "To produce the same amount of protein from animal agriculture would require much larger areas of land. By reducing meat consumption, the global demand for meat will be lowered and it would help prevent destruction of forests to make way for more livestock", "ggd"  );
			Action ol5 = new Action("Life-On-Land", "Join a community forestry project", "Through active involvement in the management of forests, local people become much more aware of all the benefits intact forests provide for them on a daily basis.", "ggd" );
			Action ol6 = new Action("Life-On-Land", "Help combat global poaching and trafficking of endangered species", "Start a campaign or support organizations that combat poaching and trafficking by donating.", "ggd" );
			Action ol7 = new Action("Life-On-Land", "Fight governmental corruption", "Corrupt governments can be payed off by illegal logging companies to ignore their activites. Don't support corrupt politicians/systems. By doing so you can help reduce deforestation overall.", "ggd" );
			Action ol8 = new Action("Life-On-Land", "Help preserve Biodiversity", "This can be done by supporting local farms,planting local fruits/vegetables and respecting local habitats.", "ggd");
			Action ol9 = new Action("Life-On-Land", "Volunteer", "Volunteer for cleanups in your local communities.", "ggd");
			
			Message msg1 = new Message(userone.getForename(), userone.getUsername(), "My neighbour's cows won't stop MOOING at 2AM in the morning!", "Mon Nov 19 2021 16:33:44 GMT+0000 (Greenwich Mean Time)");
			Message msg2 = new Message(usertwo.getForename(), usertwo.getUsername(), "Oh no, that's definitely not amoosing.", "Thurs Jan 12 2021 09:14:59 GMT+0000 (Greenwich Mean Time)");
			
			List<User> users = Arrays.asList(userone, usertwo, userthree, userfour, userfive);
			List<Bookmark> bookmarks = Arrays.asList(bm1, bm2);
			List<Action> actions = Arrays.asList(ca1,ca2,ca3, ca4, ca5, ca6, ca7, ca8, ca9, wa1, wa2, wa3, wa4, wa5, wa6, wa7, wa8, wa9, ol1, ol2, ol3, ol4, ol5, ol6, ol7, ol8, ol9);
			List<Message> messages = Arrays.asList(msg1, msg2); 
			
			bmRepository.saveAll(bookmarks);
			aRepository.saveAll(actions);
			mRepository.saveAll(messages);
			
			userone.addBookmark(bm1);
			userone.addBookmark(bm2);
			usertwo.addBookmark(bm2);
			userone.addMessage(msg1);
			usertwo.addMessage(msg2);			
			uRepository.saveAll(users);
		};
	}
}
